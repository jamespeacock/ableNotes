import React from 'react';
import {Card, CardBody,
     CardTitle, Button, Form, FormGroup, Input} from 'reactstrap'
import ApiInterface from '../api/interface.js'
class Note extends React.Component{

     constructor (props) {
          super(props);
          const text = this.props.noteText;
          const title = this.props.noteTitle;
          this.state = {inEdit: this.props.new || false, text, title};
          this.api = new ApiInterface('api/notes');

          //Bind methods.
          this.handleTextChange = this.handleTextChange.bind(this);
          this.handleTitleChange = this.handleTitleChange.bind(this);
          this.setEdit = this.setEdit.bind(this);
          this.deleteNote = this.deleteNote.bind(this);
          this.saveNote = this.saveNote.bind(this);
          this.createNote = this.createNote.bind(this);
          
     }

     async saveNote() {
          console.log('save note');
          const xhr = new XMLHttpRequest();
          this.api.put(
               this.props.id,
               {id:this.props.id, title:this.state.title, text:this.state.text}
          )
          
          this.setState({inEdit:false})
     }

     createNote() {
          console.log('create note');
          this.api.post({title:this.state.title, text:this.state.text}).then(resp =>
               this.props.refresh()
          );
     }

     setEdit() {
          this.setState({inEdit:true});
     }

     async deleteNote() {
          console.log('delete popup')
          //Raise Are you sure modal
          await this.api.delete(this.props.id)
          this.props.refresh();
     }

     handleTextChange (event) {
          this.setState({text: event.target.value});
     }

     handleTitleChange (event) {
          this.setState({title: event.target.value});
     }

     render() {
          return (
               <div>
                    <Card style={{ width: '18rem' }}>
                    <CardBody>
                         {!this.state.inEdit && <Button onClick={this.setEdit}>Edit</Button>}
                         {!this.props.new && <Button onClick={this.deleteNote}>Delete</Button>}
                         <Form>
                              <FormGroup>
                                   <Input name="title" id="noteTitle"
                                   readOnly={!this.state.inEdit}
                                   value={this.state.title} 
                                   onChange={this.handleTitleChange}/>
                                   <Input type="textarea" name="text" id="noteText" 
                                   readOnly={!this.state.inEdit}
                                   value={this.state.text || ''}
                                   onChange={this.handleTextChange}/>
                              </FormGroup>
                              {this.state.inEdit && <Button onClick={this.props.id ? this.saveNote : this.createNote}>Save</Button>}
                         </Form>
                        
                    </CardBody>
                    </Card>
               </div>
          );
      }
};
export default Note;