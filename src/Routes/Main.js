import React from 'react';

import {validation, getUserDataById, getMoneyInfo, getSent, getReceived} from "../Components/Userfunctions";

import {Redirect} from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";
import {Form} from "react-bootstrap";

import Addmoney from "../Components/Addmoney";
import Transfer from "../Components/Transfer";
import TransactionList from "../Components/TransactionList";
import bank from './bank.png';


class Main extends React.Component {

constructor(props) {
    super(props);
    this.state = {

        loggedIn:false,
        mounted:false,
        message:'',
        userID:'',
        name:'',
        balance:0,
        bankID:'Nav izveidots konts!',
        success:false,
        addMoneyModal:false,
        transferModal:false,
        transSent:{},
        transRec:{},

    };

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
                        mounted:true,
                        userID:response.userID,
                    });

                    getUserDataById(this.state.userID).then(response => {
                        if(response===undefined){
                            this.setState({message:"Savienojums ar datubāzi nav izdevies!"})
                        }else {
                            this.setState({
                                name:response.firstName + " " + response.lastName,
                            })
                        }
                    });

                    getMoneyInfo().then(response => {
                        if(response===undefined){
                            this.setState({message:"Savienojums ar datubāzi nav izdevies!"})
                        }else {
                           if(response.success===false){
                           }else{
                               this.setState({
                                   success:true,
                                   balance:response.docs.balance,
                                   bankID:response.docs.moneyID,
                               });

                               getSent().then(response => {
                                   if(response===undefined){
                                       this.setState({message:"Savienojums ar datubāzi nav izdevies!"})
                                   }else {
                                       this.setState({
                                           transSent:response
                                       })
                                   }
                               });
                               getReceived().then(response => {
                                   if(response===undefined){
                                       this.setState({message:"Savienojums ar datubāzi nav izdevies!"})
                                   }else {
                                       this.setState({
                                           transRec:response
                                       })
                                   }
                               });

                           }
                        }
                    });



                }else{
                    this.setState({
                        loggedIn:false,
                        mounted:true,
                    });
                }
            }
        });
    }

    onSubmit(e){
        e.preventDefault();

        axios.post('api/money/',{

        })
            .then(res=>{
                this.setState({message:res.data.message});
                window.location.reload(false);
            })
            .catch(e=> {
                console.log(e);
                this.setState({message:"Kļūda savienojumā!"})
            });

    }


    render() {


        if(!this.state.loggedIn&&this.state.mounted) {
            return <Redirect to="/"/>
        }

        let addMoneyModal=() => this.setState({addMoneyModal:false});
        let transferModal=() => this.setState({transferModal:false});
        return ( <div className='container '>
            <div className='text-center'>
                <h2 className="bg-warning">{this.state.message}</h2>
            </div>

                <div className="row" >
                    <div className="col-lg-6">
                        <img src={bank} width={550} height={250} alt=""/>
                    </div>
                    <div className="card col-lg-6 ">
                        <div style={{fontSize: "20px"}} className="card-header">
                            <h2>{this.state.name}</h2>
                        </div>
                        <div className="card-body">
                            <h3>Konts: {this.state.bankID} </h3>
                            <h3>Konta atlikums: {this.state.balance.toFixed(2)} Euro</h3>
                        </div>
                    </div>
                </div>


                {this.state.success===false ?
                    (<div>
                        <br></br>
                        <Form noValidate onSubmit={this.onSubmit}>
                            <Button variant="btn btn-warning" type="submit" className="float-right" block>Izveidot kontu</Button>
                        </Form>
                    </div>):
                    (<div>
                        <br></br>
                        <h3 className="text-center">Naudas darījumi</h3>

                        <div className="row">
                            <div className="col-lg-6">
                                <Addmoney
                                    show={this.state.addMoneyModal}
                                    onHide={addMoneyModal}
                                />
                                <Button variant="btn btn-light" size='lg' block onClick={()=>this.setState({addMoneyModal:true})}>Pievienot naudu</Button>
                            </div>
                            <div className="col-lg-6">
                                <Transfer
                                    show={this.state.transferModal}
                                    onHide={transferModal}
                                />
                                <Button variant="btn btn-dark" size='lg' block onClick={()=>this.setState({transferModal:true})}>Pārsūtīt naudu</Button>
                            </div>
                        </div>
                        <br></br>
                        <hr/>

                        <h3 className="text-center">Konta pārskats</h3>
                        <TransactionList
                            sent={this.state.transSent}
                            received={this.state.transRec}
                        />

                    </div>)
                }


            </div>
        )
    }
}
export default Main;