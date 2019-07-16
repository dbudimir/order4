import React, { Component } from 'react';
import styled from 'styled-components';

import SubmitOrder from '../SubmitOrderForm'

const Form = styled.div`
   .label {
      margin-top: 12px;
      font-weight: 800;
   }
   span {
      display: block;
   }
`

class CreateChipotleOrder extends Component {
   constructor() {
      super()
      this.state = {
         contentSchema: "ChipotleOrder",
         chainName: "Chipotle",
      }
   }

   updateState = (event) => {
      const target = event.target;
      const value = target.value;
      const name = target.name;

      this.setState({
         [name]: value
      })
   }

   getSelected = (e) => {
      const selectedFillings = [].filter.call(document.getElementsByName('filling'), (c) => c.checked).map(c => c.value);
      const selectedToppings = [].filter.call(document.getElementsByName('topping'), (c) => c.checked).map(c => c.value);
      this.setState({
         protiens: selectedFillings,
         toppings: selectedToppings
      })
   }

   render () {
      let tortilla = ""
      if (this.state.mealType === "Tacos") {
         tortilla = (
            <div>
               <span className="label">Tortilla</span>
               <select onChange={this.updateState} className="text-input" name="tortilla" >
                  <option value="" disabled selected>Select tortilla</option>
                  <option value="Soft Flour Toritilla">Soft Flour Toritilla</option>
                  <option value="Crispy Corn Tortilla">Crispy Corn Tortilla</option>
               </select >
            </div >)
      }

      return (
         <Switch>
            <Route path={`/create/${this.state.chainName}/submit`} render={(props) => {
               return (<SubmitOrder {...props} {...this.state} />)
            }}
            />
            <Route path="/create/Chipotle">
               <Form>
                  <form>
                     <h2>Create Your Order</h2>

                     <span className="label">Meal Type</span>
                     <select onChange={this.updateState} className="text-input" name="mealType">
                        <option value="" disabled selected>Select meal type</option>
                        <option value="Burrito">Burrito</option>
                        <option value="Burrito Bowl">Burrito Bowl</option>
                        <option value="Tacos">Tacos</option>
                        <option value="Salad">Salad</option>
                     </select>

                     {tortilla}

                     <div onChange={this.getSelected} className="fillings">
                        <span className="label">Select Protiens (no more than 2)</span>
                        <span>Chicken<input type="checkbox" name="filling" value="Chicken" /></span>
                        <span>Steak<input type="checkbox" name="filling" value="Steak" /></span>
                        <span>Barbaco<input type="checkbox" name="filling" value="Barbaco" /></span>
                        <span>Carnitas<input type="checkbox" name="filling" value="Carnitas" /></span>
                        <span>Sofritas<input type="checkbox" name="filling" value="Sofritas" /></span>
                        <span>Veggie<input type="checkbox" name="filling" value="Veggie" /></span>
                     </div>

                     <span className="label">Select Rice Option</span>
                     <select onChange={this.updateState} className="text-input" name="rice" >
                        <option value="" disabled selected>rice</option>
                        <option value="White Rice">White Rice</option>
                        <option value="Brown Rice">Brown Rice</option>
                        <option value="Both (half/half)">Both (half/half)</option>
                        <option value="No Rice">No Rice</option>
                     </select >

                     <span className="label">Select Beans</span>
                     <select onChange={this.updateState} className="text-input" name="beans" >
                        <option value="" disabled selected>beans</option>
                        <option value="Black Beans">Black Beans</option>
                        <option value="Pinto Beans">Pinto Beans</option>
                        <option value="Both (half/half)">Both (half/half)</option>
                        <option value="No Beans">No Beans</option>
                     </select >

                     <div onChange={this.getSelected} className="toppings">
                        <span className="label">Add Toppings</span>
                        <span>Cheese<input type="checkbox" name="topping" value="Cheese" /></span>
                        <span>Queso<input type="checkbox" name="topping" value="Queso" /></span>
                        <span>Fresh Tomato Salsa (Mild)<input type="checkbox" name="topping" value="Fresh Tomato Salsa (Mild)" /></span>
                        <span>Roasted Chili-Corn Salsa (Medium)<input type="checkbox" name="topping" value="Roasted Chili-Corn Salsa (Medium)" /></span>
                        <span>Tomatillo-Green Chili Salsa (Medium Hot)<input type="checkbox" name="topping" value="Tomatillo-Green Chili Salsa (Medium Hot)" /></span>
                        <span>Tomatillo-Red Chili Salsa (Hot)<input type="checkbox" name="topping" value="Tomatillo-Red Chili Salsa (Hot)" /></span>
                        <span>Sour Cream<input type="checkbox" name="topping" value="Sour Cream" /></span>
                        <span>Fajita Veggies<input type="checkbox" name="topping" value="Fajita Veggies" /></span>
                        <span>Romaine Lettuce<input type="checkbox" name="topping" value="Romaine Lettuce" /></span>
                        <span>Chipotle-Honey Vinaigrette<input type="checkbox" name="topping" value="Chipotle-Honey Vinaigrette" /></span>
                     </div>

                     <Link to={`/create/${this.state.chainName}/submit`}>
                        <p className="button" name="submit" type="submit" > Next </p>
                     </Link>
                  </form>
               </Form>
            </Route>
         </Switch>
      );
   }
}

export default CreateChipotleOrder;