import React from "react";
import Button from "react-bootstrap/Button";
import {Form} from "react-bootstrap";
import axios from "axios";
import {Redirect} from "react-router-dom";
import {validation} from "../Components/Userfunctions";

class Register extends React.Component {


    constructor(props) {
        super(props);

        this.state ={
            name: '',
            lastName: '',
            password:'',
            bankID:'',
            message:'',
            loggedIn:false,
            success:false,
        };

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangelastName = this.onChangelastName.bind(this);
        this.onChangeNick = this.onChangeNick.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        validation().then(response => {
            if(response===undefined){
                this.setState({message:"Savienojums ar datubāzi nav izdevies!"})
            }else {
                if(response.success){
                    this.setState({
                        loggedIn:true,
                    })
                }
            }
        });
    }

    onChangeName(e){
        this.setState({
            name: e.target.value
        })
    }
    onChangelastName(e){
        this.setState({
            lastName: e.target.value
        })
    }
    onChangePassword(e){
        this.setState({
            password: e.target.value
        })
    }

    onChangeNick(e){
        this.setState({
            bankID: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();

        if(this.state.bankID===''||this.state.password===''||this.state.name===''||this.state.lastName===''){
            this.setState({message:"Nav aizpildīti visi lauki!"});
            return 0;
        }

        axios.post('api/register',{
            username: this.state.bankID,
            password: this.state.password,
            firstname: this.state.name,
            lastname: this.state.lastName
        })
            .then(res=>{
                this.setState({
                    message:res.data.message,
                    success:res.data.success,
                })
            })
            .catch(e=> {
                console.log(e);
                this.setState({
                    message:"Nav savienojuma ar datubāzi!"
                })
            })
    }

    render() {

        if(this.state.loggedIn){
            return <Redirect to ="/"/>
        }

        return( <div className="container">
                <div className='text-center'>
                    <h2 className="bg-warning">{this.state.message}</h2>
                </div>
                <div className="row">
                    <div className="col-lg-3"></div>
                    <div className="col-lg-6 text-center">
                        <Form noValidate onSubmit={this.onSubmit}>
                            <Form.Group>
                                <Form.Label>
                                    <h3 className='container text-center'>Reģistrēties</h3>
                                </Form.Label>

                            </Form.Group>
                            <Form.Group controlId="username">
                                <Form.Label>Lietotājvārds</Form.Label>
                                <Form.Control type="text" placeholder="Ievadi lietotājvārdu" value={this.state.bankID} onChange={this.onChangeNick} />
                            </Form.Group>

                            <Form.Group controlId="name">
                                <Form.Label>Vārds</Form.Label>
                                <Form.Control type="text"  placeholder="Ievadi vārdu!" value={this.state.name} onChange={this.onChangeName}/>
                            </Form.Group>
                            <Form.Group controlId="lastname">
                                <Form.Label>Uzvārds</Form.Label>
                                <Form.Control type="text"  placeholder="Ievadi uzvārdu!" value={this.state.lastName} onChange={this.onChangelastName}/>
                            </Form.Group>
                            <Form.Group controlId="password">
                                <Form.Label>Parole</Form.Label>
                                <Form.Control type="password"  placeholder="Ievadi paroli!" value={this.state.password} onChange={this.onChangePassword}/>
                            </Form.Group>

                            {this.state.success===false ?
                                (  <Button variant="outline-success" type="submit" className="float-right" block>Reģistrēties</Button>)
                                :(<Button variant="outline-success" href="/" className="float-right" block>Pieslēgties</Button>)

                            }
                        </Form>
                    </div>
                    <div className="col-lg-3"></div>
                </div>

            </div>
        )
    }
}
export default Register;

