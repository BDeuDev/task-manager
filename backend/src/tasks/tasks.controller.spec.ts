import { Test, TestingModule } from '@nestjs/testing';

import { TasksController } from './tasks.controller';

import { TasksService } from './tasks.service';



describe('TasksController', () => {

  let controller: TasksController;

  let service: TasksService;



  const mockTask = {

    id: 'someId',

    title: 'Test Task',

    description: 'Test Description',

    completed: false,

  };



  const mockTasksService = {

    create: jest.fn(),

    findAll: jest.fn(),

    findOne: jest.fn(),

    update: jest.fn(),

    remove: jest.fn(),

  };



  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({

      controllers: [TasksController],

      providers: [

        {

          provide: TasksService,

          useValue: mockTasksService,

        },

      ],

    }).compile();



    controller = module.get<TasksController>(TasksController);

    service = module.get<TasksService>(TasksService);

  });



  it('should be defined', () => {

    expect(controller).toBeDefined();

  });



  describe('create', () => {

    it('should create a task', async () => {

      const createTaskDto = {

        title: 'Test Task',

        description: 'Test Description',

      };

      mockTasksService.create.mockResolvedValueOnce(mockTask);



      const result = await controller.create(createTaskDto);



      expect(service.create).toHaveBeenCalledWith(createTaskDto);

      expect(result).toEqual(mockTask);

    });

  });



  describe('findAll', () => {

    it('should return an array of tasks', async () => {

      mockTasksService.findAll.mockResolvedValueOnce([mockTask]);



      const result = await controller.findAll();



      expect(service.findAll).toHaveBeenCalled();

      expect(result).toEqual([mockTask]);

    });

  });



  describe('findOne', () => {

    it('should return a single task', async () => {

      mockTasksService.findOne.mockResolvedValueOnce(mockTask);



      const result = await controller.findOne('someId');



      expect(service.findOne).toHaveBeenCalledWith('someId');

      expect(result).toEqual(mockTask);

    });

  });



  describe('update', () => {

    it('should update a task', async () => {

      const updateTaskDto = { title: 'Updated Task' };

      mockTasksService.update.mockResolvedValueOnce(mockTask);



      const result = await controller.update('someId', updateTaskDto);



      expect(service.update).toHaveBeenCalledWith('someId', updateTaskDto);

      expect(result).toEqual(mockTask);

    });

  });



  describe('remove', () => {

    it('should remove a task', async () => {

      mockTasksService.remove.mockResolvedValueOnce(mockTask);



      const result = await controller.remove('someId');



      expect(service.remove).toHaveBeenCalledWith('someId');

      expect(result).toEqual(mockTask);

    });

  });

}); 
