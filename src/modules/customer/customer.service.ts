import QueryBuilder from '../../utils/QueryBuilder';
import { ICustomer } from './customer.interface';
import { Customer } from './customer.model';

const createCustomer = async (payload: Partial<ICustomer>) => {
  const result = await Customer.create(payload);
  return result;
};

const getAllCustomers = async (query: Record<string, unknown>) => {
  const customerQuery = new QueryBuilder(Customer.find(), query)
    .search(['name', 'phone'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await customerQuery.countTotal();
  const result = await customerQuery.modelQuery;

  return {
    meta,
    result,
  };
};

const getCustomerById = async (id: string) => {
  const result = await Customer.findById(id);
  return result;
};

const updateCustomer = async (id: string, payload: Partial<ICustomer>) => {
  const result = await Customer.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteCustomer = async (id: string) => {
  const result = await Customer.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  return result;
};

export const CustomerServices = {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};
