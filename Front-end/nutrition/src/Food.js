import React, { Component } from 'react' 
export default class Food extends Component {

    //to fectch from search
    constructor(props){
        super(props);

        this.state={
            foods:[],
            searchedFoods:[],
            currentFood:{
                name:"-",
                calories:0,
                protien:0,
                carbs:0,
                fats:0,
                fibre:0,
                weight:100,

            }

        }

    }

    selectFood(food){
        this.setState({currentFood:food});
    }

    calculateChanges(weight){
        let currFood=this.state.currentFood;
        if(weight!=="" && weight!==0){

        
        
        currFood.calories=Number((currFood.calories*weight)/currFood.weight);
        currFood.carbs=Number((currFood.carbs*weight)/currFood.weight);
        currFood.protien=Number((currFood.protien*weight)/currFood.weight);
        currFood.fats=Number((currFood.fats*weight)/currFood.weight);
        currFood.fibre=Number((currFood.fibre*weight)/currFood.weight);
        currFood.weight=weight;

        this.setState({currentFood:currFood})
        }
        else{
            this.setState({currentFood:currFood})
        }
    }

    searchFood(value){

        if(value!==""){
            let searchedArrays=this.state.foods.filter((food,index)=>{
                return food.name.toLowerCase().includes(value.toLowerCase());
            })
            this.setState({searchedFoods:searchedArrays});

        }
        else{
            this.setState({searchedFoods:[]});
        }
        
        
    }

    componentDidMount(){ //runs whenever the component loads
        fetch("http://localhost:8000/foods")
        .then((response=>response.json()))
        .then((foodsResponse)=>{
            this.setState({foods:foodsResponse.foods});
        })
        .catch((err)=>{
            console.log(err);
        })




    }



    
    render() {
        return (
            
            <div className="container" style={{height: '100%',margin: '100px',padding: '0px' }}>
                <div style={{backgroundColor:"#2d6a4f",height:"50px" ,padding:'0px'}}>
                    <ul style={{paddingLeft:'10px',paddingBottom:'20px'}}>
                        <li style={{color:'white',listStyle:'none',fontFamily:'consolas',fontSize:'30px',fontWeight:'bolder'}}>NutriCalc</li>
                    </ul></div>
                <div className="form-group" style={{marginTop:"10px"}}>
                <input className="form-control" onChange={(event)=>{
                    this.searchFood(event.target.value)
                }} placeholder="Search Food"/>

                </div>
                <div className="search-result">
                    {
                        this.state.searchedFoods.map((food,index)=>(
                    
                    <div className="result" style={{cursor:'pointer',padding:'10px'}}onClick={()=>{
                        this.selectFood(food);
                    }} key={index}>
                        {food.name}
                    
                    </div>
                    ))
                   }


                </div>
                <div className="product-display">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Calories</th>
                            <th>Protien</th>
                            <th>Carbs</th>
                            <th>Fats</th>
                            <th>Fibres</th>
                            <th>Weight</th>
                        </tr>

                        </thead>
                        <tbody>
                        <tr>
                            <td>{this.state.currentFood.name}</td>
                            <td>{this.state.currentFood.calories.toFixed(2)}</td>
                            <td>{this.state.currentFood.protien.toFixed(2)}</td>
                            <td>{this.state.currentFood.carbs.toFixed(2)}</td>
                            <td>{this.state.currentFood.fats.toFixed(2)}</td>
                            <td>{this.state.currentFood.fibre.toFixed(2)}</td>
                            <td><input type="text" defaultValue={this.state.currentFood.weight} onChange={(event)=>{
                                this.calculateChanges(Number(event.target.value));

                            }}/></td>
                        </tr>
                        </tbody>
                    </table>
                    
                </div>
            </div>
        )
    }
}

