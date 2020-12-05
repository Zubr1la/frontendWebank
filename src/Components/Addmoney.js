import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {Form} from "react-bootstrap";
import axios from "axios";

class Addmoney extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            balance:'',
            message:'',
        };


        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeBalance = this.onChangeBalance.bind(this);
    }

    onChangeBalance(e){
        this.setState({
            balance:e.target.value
        });
    }


    onSubmit(e){
        e.preventDefault();

        if(this.state.balance<=0){
            this.setState({message:"Nav ievadīta derīga naudas summa!"});
            return 0
        }

        let balString = this.state.balance.toString();

        if(balString.split(".")[1]!==undefined){
            if(balString.split(".")[1].length>2){
                this.setState({message:"Nav ievadīta derīga naudas summa!"});
                return 0
            }
        }

        axios.post('api/money/addmoney',{
            moneyTop:this.state.balance
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
                backdrop="static"
                keyboard={false}
            >

                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                       Papildini naudu
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate onSubmit={this.onSubmit}>
                        <Form.Group controlId="money">
                            <Form.Label>Naudas summa</Form.Label>
                            <Form.Control type="Number"  placeholder="Ievadi naudas summu, ko pievienot!" value={this.state.balance} onChange={this.onChangeBalance}/>
                        </Form.Group>
                        <Button variant="primary" type="submit" className="float-middle" >
                            Pievienot!
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <h4>{this.state.message}</h4>
                    <Button onClick={() => window.location.reload(false)}>Aizvērt</Button>
                </Modal.Footer>
            </Modal>
        )
    }


}
export default Addmoney;

