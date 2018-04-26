import React from 'react';
import PropTypes from 'prop-types';

export default class Collection extends React.Component {
    constructor(props) {
        super(props);

        this.items = this.props.items ? [...this.props.items] : [];

        this.update = this.update.bind(this);
        this.remove = this.remove.bind(this);
        this.add = this.add.bind(this);
        this.item = this.item.bind(this);
    }

    update(i, data) {
        this.items[i] = data;
        this.props.onChange(this.items);
    }

    remove(i) {
        if(this.props.onDelete)
            this.props.onDelete(this.items[i]);

        this.items.splice(i, 1);
        this.props.onChange(this.items);
    }

    add(item = this.props.defaults) {
        this.items.push({ id: Date.now(), ...item });
        this.props.onChange(this.items);
    }

    item(data, index) {
        const Item = this.props.component;
        const id = data.id || data.name || index;
        return <Item {...data} key={this.props.id+'_'+id}
                     index={index}
                     onChange={value => this.update(index, value)}
                     onDelete={() => this.remove(index)}/>;
    }

    render() {
        const items = this.items.map(this.item);
        return <div>{items}</div>;
    }
}

Collection.propTypes = {
    items: PropTypes.array,
    component: PropTypes.any.isRequired,
    defaults: PropTypes.object,
    id: PropTypes.string,
    onChange: PropTypes.func,
    onDelete: PropTypes.func
};
