//region filters strategy
var mei = require('./strategy/mei');
var entityType = require('./strategy/entity-type');
var lei = require('./strategy/lei');
var entityName = require('./strategy/entity-name');
var taxReadiness = require('./strategy/tax-readiness');
//endregion;

var entities = require('./strategy/entities');
var tasks = require('./strategy/tasks');

module.exports = function() {
    this.getData = function() {
        //region generate filters
        var meiData = mei();
        var leiData = lei();
        var entityTypeData = entityType();
        var entityNameData = entityName();
        var taxReadinessData = taxReadiness();
        //endregion;

        var entitiesData = entities({
            mei: meiData,
            lei: leiData,
            entityType: entityTypeData,
            taxReadiness: taxReadinessData,
            entityName: entityNameData
        });

        var tasksData = tasks({
            mei: meiData,
            lei: leiData,
            entities: entitiesData
        });

        return {
            //region filters
            mei: meiData,
            lei: leiData,
            entityType: entityTypeData,
            taxReadiness: taxReadinessData,
            entityName: entityNameData,
            //endregion;

            entities: entitiesData,
            tasks: tasksData
        };
    };
};