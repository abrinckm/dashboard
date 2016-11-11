import Ember from 'ember';

export default Ember.Route.extend({
    model(params, transition) {
        let parentId = transition.params['folders.list'].collection_id;

        return this.get('store').query('folder', {parentId:parentId, parentType:'folder'})
            .catch(e => {
                //this could mean that we're listing the wrong parent type so try collection next
                return this.get('store').query('folder',  {parentId:parentId, parentType:'collection'});
            })
            .then(model => {
                  return model;
            })
            .catch(e => {
                //this means that a 400 was returned
            });
    }
});
