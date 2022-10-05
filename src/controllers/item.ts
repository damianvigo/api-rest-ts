import { Request, Response } from 'express';
import {
  insertCars,
  getCars,
  getCar,
  updateCar,
  deleteCar,
} from '../services/item';
import { handleHttp } from '../utils/error.handle';

const getItems = async (req: Request, res: Response) => {
  try {
    const response = await getCars();
    res.send(response);
  } catch (e) {
    handleHttp(res, 'ERROR_GET_ITEMS');
  }
};

const getItem = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params;
    const response = await getCar(id);
    const data = response ? response : 'NOT_FOUND';
    res.send(data);
  } catch (e) {
    handleHttp(res, 'ERROR_GET_ITEM');
  }
};

const updateItem = async ({ params, body }: Request, res: Response) => {
  try {
    const { id } = params;
    const response = await updateCar(id, body);
    res.send(response);
  } catch (e) {
    handleHttp(res, 'ERROR_UPDATE_ITEM');
  }
};

const postItem = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const responseItem = await insertCars(body);
    res.send(responseItem);
  } catch (e) {
    handleHttp(res, 'ERROR_POST_ITEM', e);
  }
};

const deleteItem = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params;
    const response = await deleteCar(id);
    res.send(response);
  } catch (e) {
    handleHttp(res, 'ERROR_DELETE_ITEM');
  }
};

export { getItem, getItems, postItem, updateItem, deleteItem };
