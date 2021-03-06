import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Container, Image, Button, List} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {isLoaded, isEmpty} from 'react-redux-firebase'
import ScrollableAnchor, {goToAnchor} from 'react-scrollable-anchor'
import AuthModal from 'Components/AuthModal'
import WeOfferBox from 'Components/WeOfferBox'
import './styles.scss'

export default class Home extends Component {
  state = {
    authModalIsOpen: false,
    activeIndex: 0
  }

  authModalOpen = index => {
    this.setState({
      authModalIsOpen: true,
      index: typeof index === 'object' ? 0 : index
    })
  }

  authModalClose = () => this.setState({authModalIsOpen: false})

  goToWeOffer = () => goToAnchor('weOffer')
  
  render() {
    const {auth} = this.props
    const {authModalIsOpen, index} = this.state
    return (
      <Container className="home-page">
        <div className="head">
          <div className="home-text-container">
            <h1 className="font-xxl mb-0">Welcome to the Scrum Helper </h1>
            <div className="secondary-text text-light-black font-m">
              We are in beta now but we have something for you.
            </div>
            <div className="buttons-container">
              {
                isEmpty(auth) &&
                <Button className="mr-3" secondary size="medium" onClick={() => this.authModalOpen(1)}>Join us</Button>
              }
              <Button onClick={this.goToWeOffer} basic size="medium">We offer</Button>
            </div>
          </div>
          <div className="home-image-container">
            <Image
              alt="Scrum Team"
              title="Scrum Team"
              src={require('Images/home-image-top.png')}/>
          </div>
        </div>
        <hr className="horizontal-divider" />
        <ScrollableAnchor id={'weOffer'}>
          <WeOfferBox />
        </ScrollableAnchor>
        <AuthModal 
          dialogClose={this.authModalClose} 
          isDialogOpened={authModalIsOpen} 
          activeIndex={index} />
      </Container>
    )
  }

  static propTypes = {
    auth: PropTypes.object
  }
}

