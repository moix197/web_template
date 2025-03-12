import PackageModel from "./Packages.model";
import PaymentMethodModel from "./PaymentMethods.model";
import PaymentModel from "./Payments.model";
import TransactionsModel from "./Transactions.model";
import BookModel from "./Books.model";
import FileSystemModel from "./FileSystem.model";
import UserModel from "./Users.model";

const basicModels = {
	packages: PackageModel,
	paymentMethods: PaymentMethodModel,
	payments: PaymentModel,
	transactions: TransactionsModel,
	books: BookModel,
	fileSystem: FileSystemModel,
	users: UserModel,
};

export { basicModels };
