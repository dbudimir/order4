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

      this.setState(
         {
            [name]: value,
         },
         () => {
            this.handleTagNameChange(value, idx);
         }
      );
   };

   handleTagNameChange = async (value, idx) => {
      const newArray = (this.state.tags[idx] = value);

      await this.setState({
         nextArrayItem: newArray,
      });
      this.props.setTags(this.state.tags);
   };

   handleAddTag = async value => {
      await this.setState(prevState => ({
         tags: [...prevState.tags, ''],
      }));
   };

   handleRemoveTag = idx => async () => {
      const removedTag = [...this.state.tags];
      if (idx !== -1) {
         removedTag.splice(idx, 1);
         await this.setState({
            tags: removedTag,
         });
         this.props.setTags(this.state.tags);
      }
   };

   render() {
      return (
         <form onSubmit={this.handleSubmit}>
            <span className="field-label">Add Tags</span>

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
                     Remove
                  </button>
               </div>
            ))}
            <button
               type="button"
               onClick={() => this.handleAddTag(this.state.currentTag)}
               className="small"
            >
               Add Another Tag
            </button>
         </form>
      );
   }
}
