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
      chainName: '&pizza'
    };
  }

  updateState = async event => {
    const { target } = event;
    const { value } = target;
    const { name } = target;

    await this.setState({
      [name]: value
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
      finishes: selectedFinishes
    });
    this.props.setOrder(this.state);
  };

  submitOrder = async () => {
    await this.setState(prevState => ({
      ...prevState,
      submitOrder: true
    }));
    this.props.setOrder(this.state);
  };

  render() {
    // prettier-ignore
    const sauces = ['Classic Tomato', 'Spicy Tomato', 'Garlic Ricotta', 'Mushroom Truffle', 'Basil Pesto']

    const saucesSpans = sauces.map((sauce, i) => (
      <span className="checkbox-container">
        <input type="checkbox" id={sauce} name="sauce" value={sauce} key={i} />
        <label className="checkbox-label" htmlFor={sauce}>
          <span className="checkbox-custom rectangular" />
          <span className="checkbox-text">{sauce}</span>
        </label>
      </span>
    ));

    // prettier-ignore
    const cheeses = ['Mozarella', 'Shredded Blend', 'Vegan Mozzarella'];
    const cheesesSpans = cheeses.map((cheese, i) => (
      <span className="checkbox-container">
        <input type="checkbox" id={cheese} name="cheese" value={cheese} key={i} />
        <label className="checkbox-label" htmlFor={cheese}>
          <span className="checkbox-custom rectangular" />
          <span className="checkbox-text">{cheese}</span>
        </label>
      </span>
    ));

    // prettier-ignore
    const veggies = [ 'Broccoli', 'Grilled Onion', 'Jalapeno', 'Tomato', 'Mushroom', 'Roasted Pepper', 'Spinach', 'Pineapple', 'Spicy Chickpea', ];

    const veggiesSpans = veggies.map((veggie, i) => (
      <span className="checkbox-container">
        <input type="checkbox" id={veggie} name="veggie" value={veggie} key={i} />
        <label className="checkbox-label" htmlFor={veggie}>
          <span className="checkbox-custom rectangular" />
          <span className="checkbox-text">{veggie}</span>
        </label>
      </span>
    ));

    // prettier-ignore
    const proteins = [ 'Pepperoni', 'Beef Meatball', 'Chicken', 'Italian Sausage', 'Scrambled Egg', 'Salami', 'Shrimp', 'Bacon', 'Vegan Sausage', ];

    const proteinsSpans = proteins.map((protein, i) => (
      <span className="checkbox-container">
        <input type="checkbox" id={protein} name="protein" value={protein} key={i} />
        <label className="checkbox-label" htmlFor={protein}>
          <span className="checkbox-custom rectangular" />
          <span className="checkbox-text">{protein}</span>
        </label>
      </span>
    ));

    // prettier-ignore
    const finishes = [ 'Arugula', 'Basil', 'Kalamata Olive', 'Black Pepper', 'Banana Pepper', 'Pickled Onion', 'Goat Cheese', 'Romaine', 'Parmesan', 'Fig Balsamic', 'Basil Pesto', 'BBQ Sauce', 'Caesar Dressing', 'Buffalo Sauce', 'Ranch', 'Olive Oil', 'Red Pepper Chili Oil', 'Garlic Oil', 'Crumbled Croutons', "Mike's Hot Honey", 'Red Pepper Chili Flakes', ];

    const finishesSpans = finishes.map((finish, i) => (
      <span className="checkbox-container">
        <input type="checkbox" id={finish} name="finish" value={finish} key={i} />
        <label className="checkbox-label" htmlFor={finish}>
          <span className="checkbox-custom rectangular" />
          <span className="checkbox-text">{finish}</span>
        </label>
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
                <div className="select-container">
                  <select onChange={this.updateState} className="text-input" name="dough">
                    <option value="" disabled selected>
                      Select Dough
                    </option>
                    <option value="Traditional">Traditional</option>
                    <option value="Gluten Free">Gluten Free</option>
                  </select>
                  <img src="../../static/arrow-down.svg" alt="link-out-icon" />
                </div>
              </div>
            </div>

            <span className="field-label">Select Sauces</span>
            <div onChange={this.getSelected} className="sauces">
              {saucesSpans}
            </div>

            <span className="field-label">Select Cheeses</span>
            <div onChange={this.getSelected} className="cheeses">
              {cheesesSpans}
            </div>

            <span className="field-label">Select Veggies</span>
            <div onChange={this.getSelected} className="veggies">
              {veggiesSpans}
            </div>

            <span className="field-label">Select Proteins</span>
            <div onChange={this.getSelected} className="proteins">
              {proteinsSpans}
            </div>

            <span className="field-label">Select Finishes</span>
            <div onChange={this.getSelected} className="finishes">
              {finishesSpans}
            </div>
          </form>
          <br></br>
        </div>
      </Form>
    );
  }
}

export default CreateAndPizzOrder;
