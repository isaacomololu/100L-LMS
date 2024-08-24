import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from 'src/common';
import { Answer, Assignment, Course, Lecture, Question, Student, Test } from 'src/database/models';
import {
    CreateAssignmentDto,
    CreateQuestionDto,
    CreateTestDto,
    GetAssesmentDto,
    SubmitAnswerDto,
    UpdateAssignmentDto,
    UpdateQuestionDto,
    UpdateTestDto,
    GradeAnswerDto,
    GetStudentAnswersForTestDto,
    GetStudentAnswersForAssignmentsDto,
} from './dtos';

// Assessments: Assignment, tests, group-projects, term-paper 
@Injectable()
export class AssessmentService extends BaseService {
    constructor() {
        super();
    }

    async createTest(payload: CreateTestDto) {
        const { lecturerId, code, ...title } = payload;
        const lecturer = await Lecture.findOne({ where: { id: lecturerId } });
        if (!lecturer)
            return this.HandleError(new NotFoundException('Lecturer Not Found'));

        const course = await Course.findOne({ where: { code } });
        if (!course)
            return this.HandleError(new NotFoundException('Course Not Found'));
        const test = await Test.create({
            lecturerId,
            code,
            ...title,
        });

        return this.Results(test);
    }

    async createAssignment(payload: CreateAssignmentDto) {
        const { code, title, ...description } = payload;
        const course = await Course.findOne({ where: { code } });
        if (!course)
            return this.HandleError(new NotFoundException('Course Not Fozund'));
        const test = await Assignment.create({
            code,
            title,
            ...description
        });

        return this.Results(test);
    }

    async getTest(payload: GetAssesmentDto, userId: string) {
        const { id, code } = payload;

        const course = await Course.findOne({ where: { code } });
        if (!course)
            return this.HandleError(new NotFoundException('Course Not Found'));

        const test = await Test.findOne({ where: { id, code } });
        if (!test)
            return this.HandleError(new NotFoundException('Test Not Found'));

        return this.Results(test);
    }

    async getAssignment(payload: GetAssesmentDto, userId: string) { // Should have guards to ensure who is accessing
        const { id, code } = payload;

        const course = await Course.findOne({ where: { code } });
        if (!course)
            return this.HandleError(new NotFoundException('Course Not Found'));

        const assignment = await Assignment.findOne({ where: { id, code } });
        if (!assignment)
            return this.HandleError(new NotFoundException('Assignment Not Found'));

        return this.Results(assignment);
    }

    async deleteTest(payload: GetAssesmentDto) {
        const { id, code } = payload;
        const test = await Test.findOne({ where: { id, code } });
        if (!test)
            return this.HandleError(new NotFoundException('test Not Found'));

        await test.destroy();

        return this.Results(null);
    }

    async deleteAssignment(payload: GetAssesmentDto) {
        const { id, code } = payload;
        const assignment = await Assignment.findOne({ where: { id, code } });
        if (!assignment)
            return this.HandleError(new NotFoundException('assignment Not Found'));

        await assignment.destroy();

        return this.Results(null);
    }

    async updateTest(payload: UpdateTestDto, id: string) { //Route should only be assesible by the leectuer
        const { title, description, duration, totalMarks } = payload;
        const test = await Test.findOne({ where: { id } });
        if (!test)
            return this.HandleError(new NotFoundException('Test Not Found'));

        const update: any = {
            ...(title ? { title } : {}),
            ...(description ? { description } : {}),
            ...(duration ? { duration } : {}),
            ...(totalMarks ? { totalMarks } : {})
        }

        await test.update(update);
        return this.Results(test);
    }

    async updateAssignment(payload: UpdateAssignmentDto, id: string) {//Route should only be assesible by the leectuer
        const { title, description, totalMarks, dueDate } = payload;
        const assignment = await Assignment.findOne({ where: { id } });
        if (!assignment)
            return this.HandleError(new NotFoundException('Assignment Not Found'));

        const update: any = {
            ...(title ? { title } : {}),
            ...(description ? { description } : {}),
            ...(totalMarks ? { totalMarks } : {}),
            ...(dueDate ? { dueDate } : {}),

        }

        await assignment.update(update);
        return this.Results(test);
    }

    async addQuestionToTest(testId: string, payload: CreateQuestionDto) {
        const { content, type, options, answer, points } = payload;
        const test = await Test.findOne({ where: { id: testId } });
        if (!test)
            return this.HandleError(new NotFoundException('Test Not Found'));

        const question = await Question.create({
            content,
            type,
            options,
            answer,
            points,
            testId
        });

        return this.Results(question);//It returns a questions instead of the test with questions is that logical?
    }

    async addQuestionToAssignment(assignmentId: string, payload: CreateQuestionDto) {
        const { content, type, options, answer, points } = payload;
        const test = await Assignment.findOne({ where: { id: assignmentId } });
        if (!test)
            return this.HandleError(new NotFoundException('Test Not Found'));

        const question = await Question.create({
            content,
            type,
            options,
            answer,
            points,
            assignmentId
        });

        return this.Results(question);
    }

    async updateQuestion(id: string, payload: UpdateQuestionDto) {
        const { content, type, answer, points } = payload;
        const question = await Question.findOne({ where: { id: id } });
        if (!question)
            return this.HandleError(new NotFoundException('Question not found'));
        const update: any = {
            ...(content ? { content } : {}),
            ...(type ? { type } : {}),
            ...(answer ? { answer } : {}),
            ...(points ? { points } : {}),
        }
        await question.update(update);
        return this.Results(question);
    }

    async deleteQuestion(id: string) {
        const question = await Question.findOne({ where: { id: id } });
        if (!question)
            return this.HandleError(new NotFoundException('Question not found'));

        await question.destroy();
        return this.Results(null);
    }

    async submitAnswer(questionId: string, payload: SubmitAnswerDto) {
        const { content } = payload;
        const question = await Question.findByPk(questionId);
        if (!question) throw new Error('Question not found');
        const answer = Answer.create({
            content,
            submissionDate: new Date(),
            submitted: true,
            questionId,
        });
        return this.Results(answer);
    }

    async gradeAnswer(id: string, payload: GradeAnswerDto) {
        const { score } = payload;
        const answer = await Answer.findOne({ where: { id } });
        if (!answer)
            return this.HandleError(new NotFoundException('Answer Not Found'));
        const update: any = {
            ...(score ? { score } : {}),
            isGraded: true,
        };
        await answer.update(update);
    }

    async getCourseTests(code: string) {
        const test = await Assignment.findAll({ where: { code } });

        return this.Results(test);
    }

    async getCourseAssignments(code: string) {
        const assignment = await Assignment.findAll({ where: { code } });

        return this.Results(assignment);
    }

    async getStudentAnswersForTest(payload: GetStudentAnswersForTestDto) {
        const { testId, studentId } = payload;
        const test = await Test.findByPk(testId, {
            include: [{
                model: Question,
                include: [{
                    model: Answer,
                    where: { matricNo: studentId },
                }],
            }],
        });
        const answers = test.questions.flatMap(q => q.answers);
        return this.Results(answers)
    }

    async getStudentAnswersForAssignment(payload: GetStudentAnswersForAssignmentsDto) {
        const { assignmentId, studentId } = payload;

        const assignment = await Assignment.findByPk(assignmentId, {
            include: [{
                model: Question,
                include: [{
                    model: Answer,
                    where: { matricNo: studentId },
                }],
            }],
        });
        const answers = assignment.questions.flatMap(q => q.answers);
        return this.Results(answers);
    }
}
