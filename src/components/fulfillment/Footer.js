import React, { Component } from 'react';

// Imagenes
import ReactImg from '../../assets/img/react.png'

class Footer extends Component {
    render() {
        return (
            <div>
                <footer className="footer-design">
                    <div className="text-muted text-center py-3">© 2022 Copyright &nbsp;&nbsp;
                        <span className="text-white"> Otto &nbsp;&nbsp; Powered by</span>
                        <img src={ReactImg} alt="react" className="footer-size-img" />
                    </div>
                </footer>
            </div>
        )
    }
}

export default Footer;