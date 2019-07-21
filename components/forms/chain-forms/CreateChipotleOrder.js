import React, { Component } from 'react';
import styled from 'styled-components';

const Form = styled.div`
   .label {
      margin-top: 12px;
      font-weight: 800;
   }
   span {
      display: block;
   }
`;

class CreateChipotleOrder extends Component {
   constructor() {
      super();
      this.state = {
         contentSchema: 'ChipotleOrder',
         chainName: 'Chipotle',
      };
   }

   updateState = async event => {
      const { target } = event;
      const { value } = target;
      const { name } = target;

      await this.setState({
         [name]: value,
      });

      this.props.setOrder(this.state);
   };

   getSelected = async e => {
      const selectedFillings = [].filter
         .call(document.getElementsByName('filling'), c => c.checked)
         .map(c => c.value);
      const selectedToppings = [].filter
         .call(document.getElementsByName('topping'), c => c.checked)
         .map(c => c.value);
      await this.setState({
         protiens: selectedFillings,
         toppings: selectedToppings,
      });
      this.props.setOrder(this.state);
   };

   submitOrder = async () => {
      await this.setState(prevState => ({
         ...prevState,
         submitOrder: true,
      }));
      this.props.setOrder(this.state);
   };

   render() {
      let tortilla = '';
      if (this.state.mealType === 'Tacos') {
         tortilla = (
            <div>
               <span className="field-label">Select a Tortilla</span>
               <select onChange={this.updateState} className="text-input" name="tortilla">
                  <option value="" disabled selected>
                     Tortilla
                  </option>
                  <option value="Soft Flour Toritilla">Soft Flour Toritilla</option>
                  <option value="Crispy Corn Tortilla">Crispy Corn Tortilla</option>
               </select>
            </div>
         );
      }

      const fillings = ['Chicken', 'Steak', 'Barbaco', 'Carnitas', 'Sofritas', 'Veggies'];
      const fillingsSpans = fillings.map((filling, i) => (
         <span className="checkbox-container">
            <input type="checkbox" id={filling} name="filling" value={filling} key={i} />
            <label className="checkbox-label" htmlFor={filling}>
               <span className="checkbox-custom rectangular" />
               <span className="checkbox-text">{filling}</span>
            </label>
         </span>
      ));

      // prettier-ignore
      const toppings = [ 'Cheese', 'Queso', 'Fresh Tomato Salsa (Mild)', 'Roasted Chili-Corn Salsa (Medium)', 'Tomatillo-Green Chili Salsa (Medium Hot)', 'Tomatillo-Red Chili Salsa (Hot)', 'Sour Cream', 'Fajita Veggies', 'Romaine Lettuce', 'Chipotle-Honey Vinaigrette', ];
      const toppingsSpans = toppings.map((topping, i) => (
         <span className="checkbox-container">
            <input type="checkbox" id={topping} name="topping" value={topping} key={i} />
            <label className="checkbox-label" htmlFor={topping}>
               <span className="checkbox-custom rectangular" />
               <span className="checkbox-text">{topping}</span>
            </label>
         </span>
      ));

      return (
         <Form>
            <div className="customize">
               <h3>Customize your order...</h3>
               <form>
                  <span className="field-label">Select a Meal Type</span>
                  <select onChange={this.updateState} className="text-input" name="mealType">
                     <option value="" disabled selected>
                        Meal Type
                     </option>
                     <option value="Burrito">Burrito</option>
                     <option value="Burrito Bowl">Burrito Bowl</option>
                     <option value="Tacos">Tacos</option>
                     <option value="Salad">Salad</option>
                  </select>

                  {tortilla}

                  <span className="field-label">Select Protiens (No more than two)</span>
                  <div onChange={this.getSelected} className="fillings">
                     {fillingsSpans}
                  </div>

                  <span className="field-label">Select Rice </span>
                  <select onChange={this.updateState} className="text-input" name="rice">
                     <option value="" disabled selected>
                        Rice
                     </option>
                     <option value="White Rice">White Rice</option>
                     <option value="Brown Rice">Brown Rice</option>
                     <option value="Both (half/half)">Both (half/half)</option>
                     <option value="No Rice">No Rice</option>
                  </select>

                  <span className="field-label">Select Beans</span>
                  <select onChange={this.updateState} className="text-input" name="beans">
                     <option value="" disabled selected>
                        Beans
                     </option>
                     <option value="Black Beans">Black Beans</option>
                     <option value="Pinto Beans">Pinto Beans</option>
                     <option value="Both (half/half)">Both (half/half)</option>
                     <option value="No Beans">No Beans</option>
                  </select>

                  <span className="field-label">Add Toppings</span>
                  <div onChange={this.getSelected} className="toppings">
                     {toppingsSpans}
                  </div>
               </form>
               <br></br>
            </div>
         </Form>
      );
   }
}

export default CreateChipotleOrder;
