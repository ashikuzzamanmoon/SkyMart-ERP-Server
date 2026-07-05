import { Product } from '../product/product.model';
import { Customer } from '../customer/customer.model';
import { Sale } from '../sale/sale.model';

const getDashboardStats = async () => {
  const [
    totalProducts,
    totalCustomers,
    totalSales,
    revenueData,
    lowStockProducts,
  ] = await Promise.all([
    Product.countDocuments({ isDeleted: { $ne: true } }),
    Customer.countDocuments({ isDeleted: { $ne: true } }),
    Sale.countDocuments(),
    Sale.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$grandTotal' },
        },
      },
    ]),
    Product.find({ isDeleted: { $ne: true }, stockQuantity: { $lt: 5 } })
      .select('name sku stockQuantity')
      .limit(10),
  ]);

  const totalRevenue = revenueData.length > 0 ? revenueData[0].totalRevenue : 0;

  return {
    totalProducts,
    totalCustomers,
    totalSales,
    totalRevenue,
    lowStockProducts,
  };
};

export const DashboardServices = {
  getDashboardStats,
};
