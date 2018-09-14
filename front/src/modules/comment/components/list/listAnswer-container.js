import React from 'react'

import ItemAnswerContainer from'./itemAnswer-container'

class ListAnswerContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      limit: 6
    }
  }

  moreComments = () => {
    this.setState({ limit: this.state.limit + 6 })
  }

  render() {
    return (
      <div>
        {this.props.answers.slice(0, this.state.limit).map(comment => {
          return (
            <div key={comment._id}>
              <ItemAnswerContainer
                comment={comment}
                clearComment={this.props.clearComment}
                idComment={comment._id}
                handleChange={this.props.handleChange}
                asnwerParent={this.props.asnwerParent}
               />
            </div>
          )
        })}
        {(this.state.limit < this.props.answers.length)? (
          <div onClick={this.moreComments}>
            more comments
          </div>
        ): ''}
      </div>
    )
  }
};

export default ListAnswerContainer;
