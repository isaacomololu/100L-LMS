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
// @UseGuards(AuthGuard('jwt')) //use custom guard in the future
export class AssessmentController extends BaseController {
    constructor(private readonly assessmentService: AssessmentService) {
        super();
    }

    @Post('test')
    // @UseGuards(LecturerGuard)
    async createTest(@Body() form: CreateTestDto) {
        const test = await this.assessmentService.createTest(form);
        if (test.isError) return test.error;
        return this.response({
            data: test.data,
            message: 'Test created'
        });
    }

    @Post('assignment')
    // @UseGuards(LecturerGuard)
    async createAssignment(@Body() form: CreateAssignmentDto) {
        const assignment = await this.assessmentService.createAssignment(form);
        if (assignment.isError) return assignment.error;
        return this.response({
            data: assignment.data,
            message: 'Assignment created'
        });
    }

    @Get('test')
    async getTest(@Query() lecturerId, @Body() form: GetAssesmentDto) {
        const test = await this.assessmentService.getTest(form, lecturerId);
        if (test.isError) return test.error;
        return this.response({
            data: test.data,
            message: 'Test retrived'
        });
    }

    @Get('assignment')
    async getAssignment(@Query() lecturerId: string, @Body() form: GetAssesmentDto) {
        const assignment = await this.assessmentService.getAssignment(form, lecturerId);
        if (assignment.isError) return assignment.error;
        return this.response({
            data: assignment.data,
            message: 'Assignment retrived'
        });
    }

    @Get('tests')
    async getAllTest() {
        const tests = await this.assessmentService.getAllTest();
        if (tests.isError) return tests.error;
        return this.response({
            data: tests.data,
            message: 'Test retrived'
        });
    }

    @Get('assignments')
    async getAllAssignment() {
        const assignments = await this.assessmentService.getAllAssignment();
        if (assignments.isError) return assignments.error;
        return this.response({
            data: assignments.data,
            message: 'Assignment retrived'
        });
    }

    @Delete('test')
    // @UseGuards(LecturerGuard)
    async deleteTest(@Query() form: GetAssesmentDto) {
        const test = await this.assessmentService.deleteTest(form);
        if (test.isError) return test.error;
        return this.response({
            data: test.data,
            message: 'Test Deleted'
        });
    }

    @Delete('assignment')
    // @UseGuards(LecturerGuard)
    async deleteAssignment(@Query() form: GetAssesmentDto) {
        const assignment = await this.assessmentService.deleteAssignment(form);
        if (assignment.isError) return assignment.error;
        return this.response({
            data: assignment.data,
            message: 'Assignment Deleted'
        });
    }

    @Patch('test')
    // @UseGuards(LecturerGuard)
    async updateTest(@Query('id') id: string, @Body() form: UpdateTestDto) {
        const test = await this.assessmentService.updateTest(form, id);
        if (test.isError) return test.error;
        return this.response({
            data: test.data,
            message: 'Test Updated'
        });
    }

    @Patch('assignment')
    // @UseGuards(LecturerGuard)
    async updateAssignment(@Query('id') id: string, @Body() form: UpdateAssignmentDto) {
        const assignment = await this.assessmentService.updateAssignment(form, id);
        if (assignment.isError) return assignment.error;
        return this.response({
            data: assignment.data,
            message: 'Assignment Updated'
        });
    }

    @Post('test/question')
    // @UseGuards(LecturerGuard)
    async addQuestionToTest(@Query('testId') testId: string, @Body() form: CreateQuestionDto) {
        const test = await this.assessmentService.addQuestionToTest(testId, form);
        if (test.isError) return test.error;
        return this.response({
            data: test.data,
            message: 'Test Questions Created'
        });
    }

    @Post('assignment/questions')
    // @UseGuards(LecturerGuard)
    async addQuestionToAssignment(@Query('assignmetId') assignmetId: string, @Body() form: CreateQuestionDto) {
        const assignment = await this.assessmentService.addQuestionToAssignment(assignmetId, form);
        if (assignment.isError) return assignment.error;
        return this.response({
            data: assignment.data,
            message: 'Assignment Questions Created'
        });
    }

    @Patch('question') //Review routes
    // @UseGuards(LecturerGuard)
    async updateQuestion(@Query('id') id: string, @Body() form: CreateQuestionDto) {
        const question = await this.assessmentService.updateQuestion(id, form);
        if (question.isError) return question.error;
        return this.response({
            data: question.data,
            message: 'Questions Updated'
        });
    }

    @Delete('question') //Review routes
    // @UseGuards(LecturerGuard)
    async deleteQuestion(@Query('id') id: string) {
        const question = await this.assessmentService.deleteQuestion(id);
        if (question.isError) return question.error;
        return this.response({
            data: question.data,
            message: 'Questions Deleted'
        });
    }

    @Post('submit') //should be accessible by students
    async submitAnswer(@Query('questionId') questionId: string, @Body() form: SubmitAnswerDto) {
        const answer = await this.assessmentService.submitAnswer(questionId, form)
        if (answer.isError) return answer.error;
        return this.response({
            data: answer.data,
            message: 'Answer Submited'
        });
    }

    @Patch('grade')
    async gradeAnswer(@Query('id') id: string, @Body() form: GradeAnswerDto) {
        const answer = await this.assessmentService.gradeAnswer(id, form)
        if (answer.isError) return answer.error;
        return this.response({
            data: answer.data,
            message: 'Answer Graded'
        });
    }

    @Get('course-tests')
    async getCourseTests(@Query('code') code: string) {
        const tests = await this.assessmentService.getCourseTests(code)
        if (tests.isError) return tests.error;
        return this.response({
            data: tests.data,
            message: 'Tests Retrived'
        });
    }

    @Get('course-assignments')
    async getCourseAssignments(@Query('code') code: string) {
        const assignments = await this.assessmentService.getCourseAssignments(code)
        if (assignments.isError) return assignments.error;
        return this.response({
            data: assignments.data,
            message: 'Assignments Retrived'
        });
    }

    @Get('test/answers')//Not tested
    async getStudentAnswersForTest(@Query() form: GetStudentAnswersForTestDto) {
        const answers = await this.assessmentService.getStudentAnswersForTest(form)
        if (answers.isError) return answers.error;
        return this.response({
            data: answers.data,
            message: 'Answers Retrived'
        });
    }

    @Get('assignment/answers')//Not tested
    async getStudentAnswersForAssignment(@Query() form: GetStudentAnswersForAssignmentsDto) {
        const answers = await this.assessmentService.getStudentAnswersForAssignment(form)
        if (answers.isError) return answers.error;
        return this.response({
            data: answers.data,
            message: 'Answers Retrived'
        });
    }
}

//The idea here is that after an assesment has been created, it is associated with questions which are in turn associated with answers. 