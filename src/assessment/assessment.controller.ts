import { Body, Controller, Delete, Get, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { BaseController } from 'src/common';
import { AssessmentService } from './assessment.service';
import {
    CreateAssignmentDto,
    CreateQuestionDto,
    CreateTestDto,
    GetAssesmentDto,
    GetStudentAnswersForAssignmentsDto,
    GetStudentAnswersForTestDto,
    GradeAnswerDto,
    SubmitAnswerDto,
    UpdateAssignmentDto,
    UpdateTestDto
} from './dtos';
import { AuthGuard } from '@nestjs/passport';
import { LecturerGuard } from 'src/common/guards/lecturer.guard';

@Controller('assessment')
@UseGuards(AuthGuard('jwt')) //use custom guard in the future
export class AssessmentController extends BaseController {
    constructor(private readonly assessmentService: AssessmentService) {
        super();
    }

    @Post('test')
    @UseGuards(LecturerGuard)
    async createTest(@Body() form: CreateTestDto) {
        const test = await this.assessmentService.createTest(form);
        if (test.isError) return test.error;
        return this.response({
            data: test.data,
            message: 'Test created'
        });
    }

    @Post('assignment')
    @UseGuards(LecturerGuard)
    async createAssignment(@Body() form: CreateAssignmentDto) {
        const assignment = await this.assessmentService.createAssignment(form);
        if (assignment.isError) return assignment.error;
        return this.response({
            data: assignment.data,
            message: 'Assignment created'
        });
    }

    @Get('test')
    async getTest(@Query() userId, @Body() form: GetAssesmentDto) {
        const test = await this.assessmentService.getTest(form, userId);
        if (test.isError) return test.error;
        return this.response({
            data: test.data,
            message: 'Test retrived'
        });
    }

    @Get('assignment')
    async getAssignment(@Query() userId, @Body() form: GetAssesmentDto) {
        const assignment = await this.assessmentService.getAssignment(form, userId);
        if (assignment.isError) return assignment.error;
        return this.response({
            data: assignment.data,
            message: 'Assignment retrived'
        });
    }

    @Delete('test')
    @UseGuards(LecturerGuard)
    async deleteTest(@Query() form: GetAssesmentDto) {
        const test = await this.assessmentService.deleteTest(form);
        if (test.isError) return test.error;
        return this.response({
            data: test.data,
            message: 'Test Deleted'
        });
    }

    @Delete('assignment')
    @UseGuards(LecturerGuard)
    async deleteAssignment(@Query() form: GetAssesmentDto) {
        const assignment = await this.assessmentService.deleteAssignment(form);
        if (assignment.isError) return assignment.error;
        return this.response({
            data: assignment.data,
            message: 'Assignment Deleted'
        });
    }

    @Patch('test')
    @UseGuards(LecturerGuard)
    async updateTest(@Query() id: string, @Body() form: UpdateTestDto) {
        const test = await this.assessmentService.updateTest(form, id);
        if (test.isError) return test.error;
        return this.response({
            data: test.data,
            message: 'Test Updated'
        });
    }

    @Patch('assignment')
    @UseGuards(LecturerGuard)
    async updateAssignment(@Query() id: string, @Body() form: UpdateAssignmentDto) {
        const assignment = await this.assessmentService.updateAssignment(form, id);
        if (assignment.isError) return assignment.error;
        return this.response({
            data: assignment.data,
            message: 'Assignment Updated'
        });
    }

    @Post('test/question')
    @UseGuards(LecturerGuard)
    async addQuestionToTest(@Query() testId: string, @Body() form: CreateQuestionDto) {
        const test = await this.assessmentService.addQuestionToTest(testId, form);
        if (test.isError) return test.error;
        return this.response({
            data: test.data,
            message: 'Test Questions Created'
        });
    }

    @Post('assignment/questions')
    @UseGuards(LecturerGuard)
    async addQuestionToAssignment(@Query() assignmetId: string, @Body() form: CreateQuestionDto) {
        const assignment = await this.assessmentService.addQuestionToAssignment(assignmetId, form);
        if (assignment.isError) return assignment.error;
        return this.response({
            data: assignment.data,
            message: 'Assignment Questions Created'
        });
    }

    @Patch('question') //Review routes
    @UseGuards(LecturerGuard)
    async updateQuestion(@Query() id: string, @Body() form: CreateQuestionDto) {
        const question = await this.assessmentService.updateQuestion(id, form);
        if (question.isError) return question.error;
        return this.response({
            data: question.data,
            message: 'Questions Updated'
        });
    }

    @Delete('question') //Review routes
    @UseGuards(LecturerGuard)
    async deleteQuestion(@Query() id: string) {
        const question = await this.assessmentService.deleteQuestion(id);
        if (question.isError) return question.error;
        return this.response({
            data: question.data,
            message: 'Questions Deleted'
        });
    }

    @Post('submit')
    async submitAnswer(@Query() questionId: string, form: SubmitAnswerDto) {
        const answer = await this.assessmentService.submitAnswer(questionId, form)
        if (answer.isError) return answer.error;
        return this.response({
            data: answer.data,
            message: 'Answer Submited'
        });
    }

    @Patch('grade')
    async gradeAnswer(@Query() id: string, form: GradeAnswerDto) {
        const answer = await this.assessmentService.gradeAnswer(id, form)
        if (answer.isError) return answer.error;
        return this.response({
            data: answer.data,
            message: 'Answer Graded'
        });
    }

    @Get('tests')
    async getCourseTests(@Query() code: string) {
        const tests = await this.assessmentService.getCourseTests(code)
        if (tests.isError) return tests.error;
        return this.response({
            data: tests.data,
            message: 'Tests Retrived'
        });
    }

    @Get('assignments')
    async getCourseAssignments(@Query() code: string) {
        const assignments = await this.assessmentService.getCourseAssignments(code)
        if (assignments.isError) return assignments.error;
        return this.response({
            data: assignments.data,
            message: 'Assignments Retrived'
        });
    }

    @Get('test/answers')
    async getStudentAnswersForTest(@Query() form: GetStudentAnswersForTestDto) {
        const answers = await this.assessmentService.getStudentAnswersForTest(form)
        if (answers.isError) return answers.error;
        return this.response({
            data: answers.data,
            message: 'Answers Retrived'
        });
    }

    @Get('test/answers')
    async getStudentAnswersForAssignment(@Query() form: GetStudentAnswersForAssignmentsDto) {
        const answers = await this.assessmentService.getStudentAnswersForAssignment(form)
        if (answers.isError) return answers.error;
        return this.response({
            data: answers.data,
            message: 'Answers Retrived'
        });
    }
}