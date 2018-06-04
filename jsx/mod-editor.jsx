import React from 'react';
import Mod from './mod.jsx';
import Collection from './collection.jsx';

export default class TalentEditor extends React.Component {
    constructor(props) {
        super(props);

        this.type = window.location.href.indexOf('ship') < 0 ? 'gear' : 'ships';
        this.state = {
            mods: props[this.type].mods,
            deleted: []
        };

        this.collection = React.createRef();
        this.defaults = {name: 'new mod', slots: 1, max: 1, tags: []};

        this.removeMod = this.removeMod.bind(this);
        this.save = this.save.bind(this);
    }

    removeMod(t) {
        if(this.state.category !== 'deleted')
            this.setState(function(state) {
                state.deleted.push(t);
                return {deleted: state.deleted};
            });
    }

    save() {
        $.post('editor-mods.php', {
            'type': this.type,
            'data': this.state.mods
        });
    }

    render() {
        const controls = <div id="controls">
            <button className="btn btn-primary" onClick={this.save}>Save</button>
            <button className="btn btn-success" onClick={() => this.collection.current.add()}>Add</button>
        </div>;

        return <div>
            <h1>Mod Editor</h1>
            {controls}
            <Collection id='mods'
                        key='mods'
                        ref={this.collection}
                        onChange={data => this.setState({mods: data})}
                        onDelete={this.removeMod}
                        defaults={this.defaults}
                        component={Mod}
                        items={this.state.mods}/>
            {controls}
        </div>;
    }
}

