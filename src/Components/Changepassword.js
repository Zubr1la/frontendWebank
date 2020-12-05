import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {Form} from "react-bootstrap";
import axios from "axios";

class Changepassword extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            password:'',
            newPassword:'',
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeNewPassword = this.onChangeNewPassword.bind(this);
    }

    onChangePassword(e){
        this.setState({
            password:e.target.value
        });
    }

    onChangeNewPassword(e){
        this.setState({
            newPassword:e.target.value
        });
    }


    onSubmit(e){
        e.preventDefault();

        if(this.state.password===''||this.state.newPassword===''){
            this.setState({
                message:"Nav ievadīti visi dati!"
            });
            return 0;
        }

        axios.post('api/updatepassword',{
            password:this.state.password,
            newPassword:this.state.newPassword,
        })
            .then(res=>{
                this.setState({message:res.data.message})
            })
            .catch(e=> {
                console.log(e);
            })
    }

    render() {
        return(
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                       Maini savu paroli
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate onSubmit={this.onSubmit}>
                        <Form.Group controlId="passwordOld">
                            <Form.Label>Pašreizējā parole</Form.Label>
                            <Form.Control type="password"  placeholder="Ievadi pašreizējo paroli" value={this.state.password} onChange={this.onChangePassword}/>
                        </Form.Group>
                        <Form.Group controlId="passwordNew">
                            <Form.Label>Jaunā parole</Form.Label>
                            <Form.Control type="password"  placeholder="Ievadi jauno paroli" value={this.state.newPassword} onChange={this.onChangeNewPassword}/>
                        </Form.Group>
                        <Button variant="primary" type="submit" className="float-middle" >
                            Nomainīt paroli!
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <h4>{this.state.message}</h4>
                    <Button onClick={this.props.onHide}>Aizvērt</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}
export default Changepassword;

