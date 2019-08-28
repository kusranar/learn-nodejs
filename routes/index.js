import NotFound from '../dto/NotFound';
import CustomerRoute from './Customer';
import AccountRoute from './Account'
import DefaultRoute from './Default';
import TransactionRoute from './Transaction';
import WalletRoute from './Wallet';


const Routes = [
    DefaultRoute,
    CustomerRoute,
    AccountRoute,
    TransactionRoute,
    WalletRoute,
    NotFound
];

export default Routes;