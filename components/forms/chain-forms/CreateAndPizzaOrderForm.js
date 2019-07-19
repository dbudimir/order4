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

class CreateAndPizzOrder extends Component {
   constructor() {
      super();
      this.state = {
         contentSchema: 'AndPizzaOrder',
         chainName: '&pizza',
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
      const selectedSauces = [].filter
         .call(document.getElementsByName('sauce'), c => c.checked)
         .map(c => c.value);
      const selectedCheeses = [].filter
         .call(document.getElementsByName('cheese'), c => c.checked)
         .map(c => c.value);
      const selectedVeggies = [].filter
         .call(document.getElementsByName('veggie'), c => c.checked)
         .map(c => c.value);
      const selectedProteins = [].filter
         .call(document.getElementsByName('protein'), c => c.checked)
         .map(c => c.value);
      const selectedFinishes = [].filter
         .call(document.getElementsByName('finish'), c => c.checked)
         .map(c => c.value);
      await this.setState({
         sauce: selectedSauces,
         cheese: selectedCheeses,
         veggies: selectedVeggies,
         proteins: selectedProteins,
         finishes: selectedFinishes,
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
      // prettier-ignore
      const veggies = [ 'Broccoli', 'Grilled Onion', 'Jalapeno', 'Tomato', 'Mushroom', 'Roasted Pepper', 'Spinach', 'Pineapple', 'Spicy Chickpea', ];

      const veggiesSpans = veggies.map((veggie, i) => (
         <span>
            {veggie}
            <input type="checkbox" name="veggie" value={veggie} key={i} />
         </span>
      ));

      // prettier-ignore
      const proteins = [ 'Pepperoni', 'Beef Meatball', 'Chicken', 'Italian Sausage', 'Scrambled Egg', 'Salami', 'Shrimp', 'Bacon', 'Vegan Sausage', ];

      const proteinsSpans = proteins.map((protein, i) => (
         <span>
            {protein}
            <input type="checkbox" name="protein" value={protein} key={i} />
         </span>
      ));

      // prettier-ignore
      const finishes = [ 'Arugula', 'Basil', 'Kalamata Olive', 'Black Pepper', 'Banana Pepper', 'Pickled Onion', 'Goat Cheese', 'Romaine', 'Parmesan', 'Fig Balsamic', 'Basil Pesto', 'BBQ Sauce', 'Caesar Dressing', 'Buffalo Sauce', 'Ranch', 'Olive Oil', 'Red Pepper Chili Oil', 'Garlic Oil', 'Crumbled Croutons', "Mike's Hot Honey", 'Red Pepper Chili Flakes', ];

      const finishesSpans = finishes.map((finish, i) => (
         <span>
            {finish}
            <input type="checkbox" name="finish" value={finish} key={i} />
         </span>
      ));

      return (
         <Form>
            <div className="customize">
               <form>
                  <h3>Customize it...</h3>

                  <div>
                     <div>
                        <span className="field-label">Dough</span>
                        <select onChange={this.updateState} className="text-input" name="dough">
                           <option value="" disabled selected>
                              Choose a dough
                           </option>
                           <option value="Traditional">Traditional</option>
                           <option value="Gluten Free">Gluten Free</option>
                        </select>
                     </div>
                  </div>

                  <div onChange={this.getSelected} className="sauces">
                     <span className="field-label">Select Sauces (as many as you'd like)</span>
                     <span>
                        Classic Tomato
                        <input type="checkbox" name="sauce" value="Classic Tomato" />
                     </span>
                     <span>
                        Spicy Tomato
                        <input type="checkbox" name="sauce" value="Spicy Tomato" />
                     </span>
                     <span>
                        Garlic Ricotta
                        <input type="checkbox" name="sauce" value="Garlic Ricotta" />
                     </span>
                     <span>
                        Mushroom Truffle
                        <input type="checkbox" name="sauce" value="Mushroom Truffle" />
                     </span>
                     <span>
                        Basil Pesto
                        <input type="checkbox" name="sauce" value="Basil Pesto" />
                     </span>
                  </div>

                  <div onChange={this.getSelected} className="cheeses">
                     <span className="field-label">Select cheeses (as many as you'd like)</span>
                     <span>
                        Mozarella
                        <input type="checkbox" name="cheese" value="Mozarella" />
                     </span>
                     <span>
                        Shredded Blend
                        <input type="checkbox" name="cheese" value="Shredded Blend" />
                     </span>
                     <span>
                        Vegan Mozzarella
                        <input type="checkbox" name="cheese" value="Vegan Mozzarella" />
                     </span>
                  </div>

                  <div onChange={this.getSelected} className="veggies">
                     <span className="field-label">Select veggies (as many as you'd like)</span>
                     {veggiesSpans}
                  </div>

                  <div onChange={this.getSelected} className="proteins">
                     <span className="field-label">Select proteins (as many as you'd like)</span>
                     {proteinsSpans}
                  </div>

                  <div onChange={this.getSelected} className="finishes">
                     <span className="field-label">Select finishes (as many as you'd like)</span>
                     {finishesSpans}
                  </div>
               </form>
               <br></br>
               <span onClick={this.submitOrder} className="button" name="submit" type="submit">
                  Next
               </span>
            </div>
         </Form>
      );
   }
}

export default CreateAndPizzOrder;
