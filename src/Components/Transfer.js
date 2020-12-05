import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {Form} from "react-bootstrap";
import axios from "axios";

class Transfer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bankID:'',
            money:'',
            message:'',
            comment:'',
            success:false,
            openCount:0,
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeBank = this.onChangeBank.bind(this);
        this.onChangeMoney = this.onChangeMoney.bind(this);
        this.onChangeComment = this.onChangeComment.bind(this);
    }

    onChangeBank(e){
        this.setState({
            bankID:e.target.value
        });
    }

    onChangeComment(e){
        this.setState({
            comment:e.target.value
        });
    }
    onChangeMoney(e){
        this.setState({
            money:e.target.value
        });

    }

    onSubmit(e){
        e.preventDefault();

        this.setState({message:''});

        e.preventDefault();
        if(this.state.bankID==='' || this.state.money===''){
            this.setState({message:"Nav ievadīti visi dati!"});
            return 0
        }

        if(this.state.money <0){
            this.setState({message:"Ievadīts nederīgs naudas daudzums!"});
            return 0
        }

        axios.post('api/money/transfer',{
            bankID:this.state.bankID,
            value:this.state.money,
            comment:this.state.comment,
        })
            .then(res=>{
                this.setState({message:res.data.message,success:res.data.success});
                if(res.data.success===true){
                    document.getElementById("send").hidden = true;
                }
            })
            .catch(e=> {
                console.log(e);
            })
    }

    componentDidMount() {

        this.setState({
            bankID:'',
            money:'',
            message:'',
            comment:'',
            success:false,
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
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                      Naudas pārskaitījums
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate onSubmit={this.onSubmit}>
                        <Form.Group controlId="bank">
                            <Form.Label>Saņēmēja konta numurs</Form.Label>
                            <Form.Control type="Text"  placeholder="Ievadi konta numuru!" value={this.state.bankID} onChange={this.onChangeBank}/>
                        </Form.Group>
                        <Form.Group controlId="value">
                            <Form.Label>Naudas daudzums (Eur)</Form.Label>
                            <Form.Control type="Number"  placeholder="Ievadi naudas daudzumu!" value={this.state.money} onChange={this.onChangeMoney}/>
                        </Form.Group>
                        <Form.Group controlId="comm">
                            <Form.Label>Maksājuma mērķis</Form.Label>
                            <Form.Control type="Text"  placeholder="Ievadi maksājuma mērķi!" value={this.state.comment} onChange={this.onChangeComment}/>
                        </Form.Group>
                        <Button id="send" variant="primary" type="submit" className="float-middle" >
                            Veikt pārskaitījumu
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
export default Transfer;

