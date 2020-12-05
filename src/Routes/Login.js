import React from 'react';
import {validation} from "../Components/Userfunctions";
import {Redirect} from "react-router-dom";
import LoginComponent from "../Components/LoginComponent";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn:false,
            render:false,
            firstLogin:false,
        }
    }
    componentDidMount() {
        validation().then(response => {
            if(response===undefined){
                this.setState({
                    message:"Savienojums ar datubāzi nav izdevies!"
                })
            }else {
                if(response.success){
                    this.setState({
                        loggedIn:true,
                    })
                }

            }
        });
    }


    render() {

        if(this.state.loggedIn&&this.state.firstLogin){
            window.location.reload(false);
        }
        if(this.state.loggedIn&&!this.state.firstLogin){
            return <Redirect to ="/Main"/>
        }
        return <div className="container">
           <LoginComponent
                choice={1}
           />

        </div>
    }
}
export default Login;