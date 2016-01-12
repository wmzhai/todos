

export const MainLayout = React.createClass({
  render() {
    return (
      <div id="container" className="menu-open">
        <section id="menu">
          <div className="btns-group">
            <a href="#" className="btn-secondary">Sign In</a>
            <a href="#" className="btn-secondary">Join</a>
          </div>

          <div className="list-todos">
            <a className="js-new-list link-list-new">
              <span className="icon-plus"></span>
              New List
            </a>
          </div>
        </section>

        <div id="content-container">
          {this.props.content}
        </div>
      </div>
    );
  }
});
