import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, useHistory } from "react-router-dom";
import './App.css';

// Login
import Login from "./components/login/Login"
import SignUp from './components/login/Signup';

// Fulfillment
import FirstLoginAdminFulfillment from "./components/fulfillment/firstLogin/FirstLogin"
import MainViewFulfillment from "./components/fulfillment/MainView"
import Request from "./components/fulfillment/request/Request"
import Warehouse from "./components/fulfillment/warehouse/Warehouse"
import NewOperator from './components/fulfillment/warehouse/NewOperator';
import EditOperator from './components/fulfillment/warehouse/EditOperator';
import Sales from "./components/fulfillment/orders/Sales"
import Inventory from "./components/fulfillment/inventory/Inventory"
import Permission from "./components/fulfillment/Permission"
import Profile from './components/fulfillment/Profile';
import NewEntry from './components/fulfillment/inventory/NewEntry';
import EditProduct from './components/fulfillment/inventory/EditProduct';
import StockRequest from './components/fulfillment/inventory/StockRequest';

// Operator
import MainOperator from './components/operator/MainView';
import OperatorSales from './components/operator/orders/Sales';
import OperatorProfile from './components/operator/Profile';

// Client
import FirstLoginClientFulfillment from "./components/customer_profile/firstLogin/FirstLogin"
import MainClient from './components/customer_profile/MainView';
import ClientPermission from "./components/customer_profile/permission/Permission"
import ClientPermissionOk from "./components/customer_profile/permission/PermissionOk"
import ClientPermissionTNOk from "./components/customer_profile/permission/PermissionTNOk"
import ClientPermissionError from "./components/customer_profile/permission/PermissionError"
import ClientRequest from './components/customer_profile/request/Request';
import ClientInventory from './components/customer_profile/inventory/Inventory';
import ClientNewEntry from './components/customer_profile/inventory/NewEntry';
import ClientStockRequest from './components/customer_profile/inventory/StockRequest';
import ClientProfile from './components/customer_profile/Profile';

class App extends Component {

  render() {
      return (

        <Router>

          {/* Login */}
          <Route exact path="/login" component={Login} />
          <Route exact path="/signUp" component={SignUp} />

          {/* admin_fulfillment */}
          <Route exact path="/admin_fulfillment/primer_inicio" component={FirstLoginAdminFulfillment} />
          <Route exact path="/admin_fulfillment/inicio" component={MainViewFulfillment} />
          <Route exact path="/admin_fulfillment/permisos" component={Permission} />
          <Route exact path="/admin_fulfillment/solicitudes" component={Request} />
          <Route exact path="/admin_fulfillment/deposito" component={Warehouse} />
          <Route exact path="/admin_fulfillment/nuevo_operario" component={NewOperator} />
          <Route exact path="/admin_fulfillment/editar_operario" component={EditOperator} />
          <Route exact path="/admin_fulfillment/ventas" component={Sales} />
          <Route exact path="/admin_fulfillment/inventario" component={Inventory} />
          <Route exact path="/admin_fulfillment/nuevo_ingreso" component={NewEntry} />
          <Route exact path="/admin_fulfillment/editar_producto" component={EditProduct} />
          <Route exact path="/admin_fulfillment/solicitud_carga_producto" component={StockRequest} />
          <Route exact path="/admin_fulfillment/perfil" component={Profile} />
          
          {/* cliente_fulfillment */}
          <Route exact path="/cliente_fulfillment/primer_inicio" component={FirstLoginClientFulfillment} />
          <Route exact path="/cliente_fulfillment/inicio" component={MainClient} />
          <Route exact path="/cliente_fulfillment/permisos" component={ClientPermission} />
          <Route exact path="/cliente_fulfillment/permisos/permisos_otorgados" component={ClientPermissionOk} />
          <Route exact path="/cliente_fulfillment/permisos/permisos_otorgados_tiendanube" component={ClientPermissionTNOk} />
          <Route exact path="/cliente_fulfillment/permisos/error_permisos" component={ClientPermissionError} />
          <Route exact path="/cliente_fulfillment/solicitudes" component={ClientRequest} />
          <Route exact path="/cliente_fulfillment/inventario" component={ClientInventory} />
          <Route exact path="/cliente_fulfillment/nuevo_ingreso" component={ClientNewEntry} />
          {/* <Route exact path="/cliente_fulfillment/editar_producto" component={ClientEditProduct} /> */}
          <Route exact path="/cliente_fulfillment/solicitud_carga_producto" component={ClientStockRequest} />
          <Route exact path="/cliente_fulfillment/perfil" component={ClientProfile} />

          {/* operario_fulfillment */}
          <Route exact path="/operario_fulfillment/inicio" component={MainOperator} />
          <Route exact path="/operario_fulfillment/ventas" component={OperatorSales} />
          <Route exact path="/operario_fulfillment/perfil" component={OperatorProfile} />

          {/* raiz */}
          <Route exact path="/" render={() => <Redirect to="/login" />} />
      </Router>
      )
  }
}

export default App;