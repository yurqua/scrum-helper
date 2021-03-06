import React, {Component} from 'react'
import {Container, Header, List, Icon, Transition, Label, Message} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {isLoaded, isEmpty} from 'react-redux-firebase'
import {NotificationManager}  from 'react-notifications'
import PropTypes from 'prop-types'
import _ from 'lodash'
import EmptyTeamList from './EmptyTeamList'
import MembersInTheList from 'Components/MembersInTheList'
import AddTeamBox from './AddTeamBox'
import SMLoader from 'Components/SMLoader'
import './styles.scss'

export default class TeamList extends Component {

  deleteTeam = key => {
    const {firebase, teams} = this.props
    firebase.remove(`teams/${key}/`).then(() => {
      NotificationManager.success(
        `Team ${teams[key].name} successfully deleted`, 
        'Confirmation'
      )
    })
  }

	deleteMember = (member, teamid) => {
    const {firebase, teams} = this.props
    const team = teams[teamid]
		firebase.remove(`teams/${teamid}/members/${member.id}`).then(() => {
			NotificationManager.success(
				`Member ${member.name} successfully removed from ${teams[teamid].name}`, 
				'Confirmation'
			)
		})
  }

  handleDismiss = () => {
    const {firebase} = this.props
    firebase.updateProfile({teamListMessageHidden: true})
  }

  render() {
    const {teams, profile} = this.props
    return (
      <Container className="list-container">
        <h2 className="list-title">My Teams</h2>
        {
          !profile.teamListMessageHidden &&
          <Message
            onDismiss={this.handleDismiss}
            header='Just hover on the team box to add members to your team!'
            content='And press blue plus button!'
          />
        }
        {
          isLoaded(teams) ?
          <Transition.Group as={List} duration={500}> 
            {
              _.keys(teams).map(k => {
                return (
                  <List.Item className="text-color item-container" key={k}>
                    <div className="color-filler" style={{backgroundColor: teams[k].color}}></div>
                    <List.Content>
                      <List.Header>{teams[k].name}</List.Header>
                      <MembersInTheList members={teams[k].members} parent={k} deleteMember={this.deleteMember} />
                      <div className="list-controls">
                        <Link to={`/teams/${k}/addMember`} className="icon-border">
                          <Icon size="large" name="add" />
                        </Link>
                        <Icon className="trash-icon" onClick={() => this.deleteTeam(k)} size="large" name="trash" color="red" />
                      </div>
                    </List.Content>
                    {
                      !teams[k].members && 
                      <Label as='a' className="list-label" color='teal' ribbon='right'>Team is empty</Label>
                    }
                    {
                      // team size warning
                      // teams[k].members && (9 > _.keys(teams[k].members).length || _.keys(teams[k].members).length < 5) &&
                      // <Label as='a' className="list-label" color='teal' ribbon='right'>The recommended team size is 5 ± 2</Label>
                    }
                  </List.Item>
                )
              })
            }
            <AddTeamBox />
          </Transition.Group> :
          <SMLoader />
        }
      </Container>
    )
  }

	static propTypes = {
		firebase: PropTypes.object.isRequired,
		teams: PropTypes.object
	}
}