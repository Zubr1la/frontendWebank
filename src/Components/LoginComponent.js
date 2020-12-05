import React from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {login, validation} from "../Components/Userfunctions";
import {Redirect} from "react-router-dom";

class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName : '',
            password : '',
            loggedIn:false,
            render:false,
            message:'',
            firstLogin:false,
        }
        ;
        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    onChangeUserName(e){
        this.setState({
            userName: e.target.value
        })
    }
    onChangePassword(e){
        this.setState({
            password: e.target.value
        })
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

    onSubmit(e){
        e.preventDefault();

        if(this.state.userName.length===0||this.state.password.length===0){

            this.setState({
                message:"Nav aizpildīti nepieciešamie lauki!"
            });
            return
        }

        const user = {
            userName : this.state.userName,
            password : this.state.password
        };
        login(user).then(response => {
            if(response===undefined){
                this.setState({
                    message:"Savienojums ar datubāzi nav izdevies!"
                });
                return 0;
            }
            if(response.success){
                this.setState({
                    loggedIn: true,
                    firstLogin:true,
                });
                this.props.sendData("test");
            }else {
                this.setState({
                    loggedIn: false,
                    message:response.message,
                });
            }
        })
    }


    render() {

        if(this.state.loggedIn&&this.state.firstLogin&&this.props.choice===1){
            window.location.reload(false);
        }
        if(this.state.loggedIn&&!this.state.firstLogin&&this.props.choice===1){
            return <Redirect to ="/Main"/>
        }
        return <div className="container">
            <div className="mx-auto col-8">
                <h2 className="bg-warning text-center">{this.state.message}</h2>
            </div>
            <div className="mx-auto col-8 ">
                <Form noValidate onSubmit={this.onSubmit}>
                    <Form.Group controlId="loginForm">
                        <Form.Label>Lietotāja kods</Form.Label>
                        <Form.Control type="text" placeholder="Lietotāja kods" name='userName' value={this.state.userName} onChange={this.onChangeUserName}/>
                    </Form.Group>
                    <Form.Group controlId="passwordForm">
                        <Form.Label>Parole</Form.Label>
                        <Form.Control type="password" placeholder="Parole" name='password' value={this.state.password} onChange={this.onChangePassword} />
                    </Form.Group>
                    <Button variant="btn btn-info" type="submit" className="float-right" block>Pieslēgties</Button>
                </Form>
            </div>

        </div>
    }
}
export default LoginComponent;