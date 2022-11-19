    import React, { Component } from 'react';

    // Componentes
    import Sidebar from './Sidebar'
    import Footer from './Footer'



    class Main extends Component {
        constructor(props) {
            super(props);
            this.state = {
                text_search: '',
            };
            
        }

        setTextFilter(event){
            var text_search = event.target.value
            this.setState({
                text_search: text_search,
            })
        }

        render() {
            return (
                <div>
                    <div>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col col-sm-12 col-md-5 col-lg-2 text-secondary sidebar-background-color sidebar-design">
                                    <Sidebar history={this.props.history}/>
                                </div>
                                <div className="col">
                                    <div className="container-fluid">
                                        <div className="row mt-4">
                                            <div className="col col-sm-12 col-md-12 col-lg-12">
                                                <nav className="navbar navbar-light">
                                                    <h4 className='float-left text-muted no-margin-botton'>Bienvenido Juan!</h4>
                                                    <form class="d-flex">
                                                        <input 
                                                            className="form-control me-2" 
                                                            type="search" 
                                                            placeholder="Buscar" 
                                                            aria-label="Search"
                                                            value={this.state.text_search} 
                                                            onChange={(text_search) => this.setTextFilter(text_search)}/>
                                                        <button 
                                                            className="btn btn-office4u-outline" type="button">
                                                            <i 
                                                                className="material-icons float-right align-middle">
                                                                search
                                                            </i>
                                                        </button>
                                                        <button 
                                                            className="btn me-4 position-relative" 
                                                            type="button">
                                                            <i 
                                                                className="material-icons align-middle">
                                                                notifications
                                                            </i>
                                                            <span class="position-absolute top-0 start-80 translate-middle badge rounded-pill bg-danger">
                                                                3
                                                                <span class="visually-hidden">unread messages</span>
                                                            </span>
                                                        </button>
                                                    </form>
                                                </nav>
                                            </div>
                                        </div>
                                        <hr/>
                                        
                                        <div className="row mt-5 mb-5"></div>
                                        <div className="row mt-5 mb-5"></div>

                                        <div className="row mt-5">
                                            <div className="col align-self-center text-center">

                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <Footer/> */}
                </div>
            )
        }
    }

    export default Main;