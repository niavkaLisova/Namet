import React from 'react'

import { API_DOMAIN } from '../../../../utils/config.js'
import { withStyles } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'

const styles = theme => ({
  card: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 80,
    height: 80,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
});

const UserCardContainer = ({user, handle, classes, theme}) => {
  return (
		<div>
			<Card className={classes.card} onClick={ () => handle(user)}>
        <CardMedia
          className={classes.cover}
          image={API_DOMAIN + 'public/upload/user/' + user.avatar}
          title={user.email}
        />

        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography variant="body2">{user.nickname}</Typography>
            <Typography variant="caption" color="textSecondary">
              {user.name}
            </Typography>
          </CardContent>
          <div className={classes.controls}>
          </div>
        </div>
      </Card>
		</div>
	)
}

export default withStyles(styles, { withTheme: true })(UserCardContainer);
