import React from 'react';
import Note from './Note.js';
import {Button} from 'reactstrap';
import ApiInterface from '../api/interface.js';

class NoteList extends React.Component {
     constructor(props) {
          super(props);
          this.state = { notes: [], loading: true};
          this.addNote = this.addNote.bind(this);
          this.refreshNotes = this.refreshNotes.bind(this);
          this.loadNotes = this.loadNotes.bind(this);
          this.api = new ApiInterface('api/notes');
     }

     loadNotes() {
          this.api.get().then(notes => 
               this.setState({ notes: (notes ? notes : []), loading: false })
          );
     }

     componentDidMount() {
          this.loadNotes();
     }

     addNote() {
          console.log('add note')
          let notes = this.state.notes;
          notes.push({title:'Title', text:'Note contents', new:true, id:''});
          this.setState({notes});
     }

     refreshNotes() {
          this.loadNotes();
     }

     renderNotes(notes) {
          
          var notes = notes.map(note => (
               <Note 
                    key={note.id}
                    id={note.id}
                    noteTitle={note.title}
                    noteText={note.text}
                    refresh={this.refreshNotes}
                    new={note.new}
               />
          ));

          return (
               <div>
                    {notes}
                    <Button onClick={this.addNote}>Add Note</Button>
               </div>
               
          );
     }

     render() {
          let contents = this.state.loading
          ? <p><em>Loading...</em></p>
          : this.renderNotes(this.state.notes);

          return (
               <div>
                 {contents}
               </div>
             );
     }

};
export { NoteList };