import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TasksService } from './tasks.service';
import { Task } from './schemas/task.schema';

describe('TasksService', () => {
  let service: TasksService;
  let model: Model<Task>;

  const mockTask = {
    id: 'someId',
    title: 'Test Task',
    description: 'Test Description',
    completed: false,
  };

  const mockTasks = [mockTask];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getModelToken(Task.name),
          useValue: {
            find: jest.fn().mockReturnValue({
              exec: jest.fn().mockResolvedValue(mockTasks),
            }),
            findById: jest.fn().mockReturnValue({
              exec: jest.fn().mockResolvedValue(mockTask),
            }),
            findByIdAndUpdate: jest.fn().mockReturnValue({
              exec: jest.fn().mockResolvedValue(mockTask),
            }),
            findByIdAndDelete: jest.fn().mockReturnValue({
              exec: jest.fn().mockResolvedValue(mockTask),
            }),
            create: jest.fn().mockResolvedValue(mockTask),
          },
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    model = module.get<Model<Task>>(getModelToken(Task.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all tasks when no completed parameter is provided', async () => {
      const result = await service.findAll();
      expect(model.find).toHaveBeenCalledWith({});
      expect(result).toEqual(mockTasks);
    });

    it('should return completed tasks when completed is true', async () => {
      const result = await service.findAll(true);
      expect(model.find).toHaveBeenCalledWith({ completed: true });
      expect(result).toEqual(mockTasks);
    });

    it('should return incomplete tasks when completed is false', async () => {
      const result = await service.findAll(false);
      expect(model.find).toHaveBeenCalledWith({ completed: false });
      expect(result).toEqual(mockTasks);
    });
  });

  describe('findOne', () => {
    it('should return a single task', async () => {
      const result = await service.findOne('someId');
      expect(model.findById).toHaveBeenCalledWith('someId');
      expect(result).toEqual(mockTask);
    });
  });

  describe('create', () => {
    it('should create a new task', async () => {
      const createTaskDto = {
        title: 'Test Task',
        description: 'Test Description',
      };

      const result = await service.create(createTaskDto);
      expect(model.create).toHaveBeenCalledWith(createTaskDto);
      expect(result).toEqual(mockTask);
    });
  });

  describe('update', () => {
    it('should update a task', async () => {
      const updateTaskDto = { title: 'Updated Task' };
      const result = await service.update('someId', updateTaskDto);
      expect(model.findByIdAndUpdate).toHaveBeenCalledWith(
        'someId',
        updateTaskDto,
        { new: true },
      );
      expect(result).toEqual(mockTask);
    });
  });

  describe('remove', () => {
    it('should remove a task', async () => {
      const result = await service.remove('someId');
      expect(model.findByIdAndDelete).toHaveBeenCalledWith('someId');
      expect(result).toEqual(mockTask);
    });
  });
}); 