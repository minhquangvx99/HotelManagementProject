// /*
//  * This file is part of OrangeHRM
//  *
//  * Copyright (C) 2020 onwards OrangeHRM (https://www.orangehrm.com/)
//  *
//  * This program is free software; you can redistribute it and/or modify
//  * it under the terms of the GNU General Public License as published by
//  * the Free Software Foundation; either version 3 of the License, or
//  * (at your option) any later version.
//  *
//  * This program is distributed in the hope that it will be useful,
//  * but WITHOUT ANY WARRANTY; without even the implied warranty of
//  * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//  * GNU General Public License for more details.
//  *
//  * You should have received a copy of the GNU General Public License
//  * along with this program.  If not, see <http://www.gnu.org/licenses/>.
//  *
//  */

// import { WithLogoutAction } from 'types/Global';
// import { TopicState, TopicActionTypes, FETCH_LIST_TOPIC, FETCH_LIST_TOPIC_SUCCESS, FETCH_LIST_TOPIC_ERR } from './Types';

// const initialState: TopicState = {};

// const topicReducer = (state = initialState, action: WithLogoutAction<TopicActionTypes>): TopicState => {
//   switch (action.type) {
//     case FETCH_LIST_TOPIC:
//       return {
//         ...state,
//         loading: true,
//       };
//     case FETCH_LIST_TOPIC_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         data: action.payload
//       };
//     case FETCH_LIST_TOPIC_ERR:
//       return {
//         ...state,
//         loading: false,
//         error: action.payload
//       };
//     default:
//       return state;
//   }
// };

// export default topicReducer;
