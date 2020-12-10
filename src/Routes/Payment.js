import React from 'react';
import LoginComponent from "../Components/LoginComponent";
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import axios from "axios";
import {logoutFunc} from "../Components/Userfunctions";

class Payment extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            logged:false,
            message:'',
            bank:'',
            paymentId:'',
            balance:'',
            success:false,
            attempted:false,
        };

        this.getData = this.getData.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
        this.setState({
            bank:this.props.match.params.bank,
            paymentId:this.props.match.params.id,
            balance:this.props.match.params.balance,
        });
        logoutFunc().then(response => {});
        window.onbeforeunload = function() {
            logoutFunc().then(response => {});
            return "";
        };
    }



    getData(val){

        this.setState({
            logged:true
        })
    }

    onSubmit(e){
        e.preventDefault();

        this.setState({message:''});

        if(this.state.balance<=0){
            this.setState({message:''});

        }

        axios.post('/api/money/transfer',{
            bankID:this.state.bank,
            value:this.state.balance,
            comment:"Pirkuma apmaksa: "+ this.state.paymentId,
        })
            .then(res=>{
                this.setState({
                    message:res.data.message,
                    success:res.data.success,
                    attempted:true,
                })
            })
            .catch(e=> {
                console.log(e);
            })

    }


    render() {
        return <div className="container">
            <h1 className="text-center">WE BANK Apmaksa</h1>
            <hr/>

            {this.state.logged===false ?
                (<div>
                    <h3 className="text-center">Autorizēties bankā</h3>
                    <LoginComponent sendData={this.getData}/>
                </div>):
                (this.state.attempted===false?
                    (<div className="text-center">
                        <h3>Apmaksas informācija</h3>
                        <Form noValidate onSubmit={this.onSubmit}>
                            <h5>Saņēmēja konts: {this.props.match.params.bank}</h5>
                            <h5>Summa: {parseFloat(this.props.match.params.balance).toFixed(2)} Euro</h5>
                            <h5>Identifikators: {this.props.match.params.id}</h5>
                            <Button variant="primary" type="submit" className="float-middle" >
                                Veikt apmaksu
                            </Button>
                        </Form>
                    </div>):
                    (this.state.success===true&&this.state.attempted===true ?
                        (<div className="text-center">
                            <h4>{this.state.message}</h4>
                            <h3>Apmaksa veikta!</h3>
                            <button onClick={() => window.location='https://tinylittlebookshop.xyz/check.php?order_ID='+this.props.match.params.id+'&isTrue=true'}>Atgriezties</button>

                        </div>):
                        (<div className="text-center">

                            <h4>{this.state.message}</h4>
                            <h3>Apmaksa nav veikta!</h3>
                            <button onClick={() => window.location='https://tinylittlebookshop.xyz/check.php?order_ID='+this.props.match.params.id+'&isTrue=false'}>Atgriezties</button>
                        </div>)))
            }

        </div>
    }
}

export default Payment;
