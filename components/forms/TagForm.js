import React, { Component } from 'react';

export default class TagForm extends Component {
   constructor() {
      super();
      this.state = {
         nextArrayItem: '',
         tags: [''],
      };
   }

   updateState = idx => event => {
      const { target } = event;
      const { value } = target;
      const { name } = target;

      console.log(idx);

      this.setState(
         {
            [name]: value,
         },
         () => {
            this.handleTagNameChange(value, idx);
         }
      );
   };

   handleTagNameChange = (value, idx) => {
      const newArray = (this.state.tags[idx] = value);

      this.setState({
         nextArrayItem: newArray,
      });
   };

   handleAddTag = async value => {
      await this.setState(prevState => ({
         tags: [...prevState.tags, ''],
      }));
      this.props.setTags(this.state.tags);
   };

   handleRemoveTag = idx => () => {
      const removedTag = [...this.state.tags];
      if (idx !== -1) {
         removedTag.splice(idx, 1);
         this.setState({
            tags: removedTag,
         });
      }
   };

   render() {
      return (
         <form onSubmit={this.handleSubmit}>
            <h4>tags</h4>

            {this.state.tags.map((tag, idx) => (
               <div className="tag">
                  <input
                     type="text"
                     name={`tag${idx}`}
                     value={this.state.tags[idx]}
                     placeholder="tag name"
                     onChange={this.updateState(idx)}
                  />
                  <button type="button" onClick={this.handleRemoveTag(idx)} className="small">
                     -
                  </button>
               </div>
            ))}
            <button
               type="button"
               onClick={() => this.handleAddTag(this.state.currentTag)}
               className="small"
            >
               Add tag
            </button>
         </form>
      );
   }
}
