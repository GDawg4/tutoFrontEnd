import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions/auth';


const TokenRefresh = ({ onRefresh, reviewTime = 10000 }) => {
	useEffect(
		() => {
			const interval = setInterval(onRefresh, reviewTime);
			return () => {
				clearInterval(interval);
			};
		},
	[]);

  return null;
};


export default connect(
  	undefined,
  	dispatch => ({
    	onRefresh() {
      		// dispatch(actions.startTokenRefresh());
    	},
  	}),
)(TokenRefresh);
