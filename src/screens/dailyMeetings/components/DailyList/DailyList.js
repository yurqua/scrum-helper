import React, {Component} from 'react'
import {Container, Header, List, Icon, Button} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {isLoaded, isEmpty} from 'react-redux-firebase'
import {NotificationManager}  from 'react-notifications'
import PropTypes from 'prop-types'
import CreateMeetingBox from './CreateMeetingBox'
import SMLoader from 'Components/SMLoader'
import MembersInTheList from 'Components/MembersInTheList'
import ExtendMembersList from 'Helpers/ExtendMembersList'
import './styles.scss'

export default class DailyList extends Component {

  deleteDaily = key => {
    const {firebase, meetings} = this.props
    firebase.remove(`dailyMeetings/${key}/`).then(() => {
      NotificationManager.success(
        `Meeting for ${meetings[key].team.name} successfully deleted`, 
        'Confirmation'
      )
    })
  }

	deleteMember = (member, meetingId) => {
    const {firebase, teams} = this.props
		firebase.remove(`dailyMeetings/${meetingId}/members/${member.key}`).then(() => {
			NotificationManager.success(
				`Member ${member.name} successfully removed`, 
				'Confirmation'
			)
		})
	}

  render() {
    const {meetings, teams} = this.props
    return (
      <Container className="list-container daily-list">
        <h2 className="list-title">My Daily Meetings</h2>
        {
          isLoaded(meetings) ?
          <List>
            {
              _.keys(meetings).map(k => {
                const meeting = meetings[k]
                const extendedMembersList = ExtendMembersList(meeting.members, meeting.team.members)
                return (
                  <List.Item className="text-color item-container" key={k}>
                    <div className="color-filler" style={{backgroundColor: meeting.team.color}}></div>
                    <List.Content>
                      <List.Header>{meeting.team.name} daily</List.Header>
                      <MembersInTheList members={extendedMembersList} deleteMember={this.deleteMember} parent={k} />
                      <Button as={Link} to={`daily/ongoing/${k}`} className="join-button" inverted>Start</Button>
                      <div className="list-controls">
                        <Icon onClick={() => this.deleteDaily(k)} className="trash-icon" size="large" name="trash" color="red" />
                      </div>
                    </List.Content>
                  </List.Item>
                )
              })
            }
            <CreateMeetingBox />
          </List> :
          <SMLoader />
        }
      </Container>
    )
  }

	static propTypes = {
		firebase: PropTypes.object.isRequired,
		teams: PropTypes.object,
		meetings: PropTypes.object
  }
  
}