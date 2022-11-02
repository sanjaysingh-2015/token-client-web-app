import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { menus } from './menus.reducer';
import { organizations } from './organizations.reducer';
import { departments } from './departments.reducer';
import { categories } from './categories.reducer';
import { tokenTypes } from './tokenTypes.reducer';
import { processStages } from './processStages.reducer';
import { counters } from './counters.reducer';
import { counterStageMappings } from './counterStageMappings.reducer';

const rootReducer = combineReducers({
    authentication,
    registration,
    users,
    alert,
    menus,
    organizations,
    departments,
    categories,
    tokenTypes,
    processStages,
    counters,
    counterStageMappings
});

export default rootReducer;