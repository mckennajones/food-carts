let React = require('react');

class Vendor extends React.Component {
  render () {
    let r = this.props.data;
    return (
      <li onClick={this.props.onClick.bind(null, r.name)} onMouseEnter={this.props.handleHover.bind(null, r.name)}>
        <p className="cart-name">{r.name}</p>

        <div className="row">
          <img src='assets/pin.svg'></img>
          <div className="content">{r.address}</div>
        </div>
        <div className="row">
          <img src='assets/information.svg'></img>
          <div className="content"><a href={r.url} target='yelp'>Website</a></div>
        </div>
      </li>
    );
  }
}

module.exports = Vendor;
