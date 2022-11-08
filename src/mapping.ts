import {
  Contract,
  DataFeedFunded,
  NewDataFeed,
  OneTimeTipClaimed,
  TipAdded,
  TipClaimed,
  SetupDataFeedCall,
} from "../generated/Contract/Contract"
import { DataFeedFundedEntity, NewDataFeedEntity, OneTimeTipClaimedEntity, TipAddedEntity, TipClaimedEntity, DataFeedEntity } from "../generated/schema"

export function handleDataFeedFunded(event: DataFeedFunded): void {
  let entity = new DataFeedFundedEntity(event.block.timestamp.toHex())
  entity._queryId = event.params._queryId;
  entity._feedId = event.params._feedId;
  entity._amount = event.params._amount;
  entity._feedFunder = event.params._feedFunder;

  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.fee(...)
  // - contract.getCurrentFeeds(...)
  // - contract.getCurrentTip(...)
  // - contract.getCurrentValue(...)
  // - contract.getDataBefore(...)
  // - contract.getDataFeed(...)
  // - contract.getIndexForDataBefore(...)
  // - contract.getNewValueCountbyQueryId(...)
  // - contract.getPastTipByIndex(...)
  // - contract.getPastTipCount(...)
  // - contract.getPastTips(...)
  // - contract.getRewardClaimedStatus(...)
  // - contract.getTimestampbyQueryIdandIndex(...)
  // - contract.isInDispute(...)
  // - contract.master(...)
  // - contract.owner(...)
  // - contract.retrieveData(...)
  // - contract.tellor(...)
  // - contract.tips(...)
}

export function handleNewDataFeed(event: NewDataFeed): void {
  
  let contract = Contract.bind(event.address)

  let entity = new NewDataFeedEntity(event.block.timestamp.toHex())
  entity._queryId = event.params._queryId;
  entity._feedId = event.params._feedId;
  entity._queryData = event.params._queryData;
  entity._feedCreator = event.params._feedCreator

  let dataFeed = new DataFeedEntity(event.block.timestamp.toHex())

  let callResult = contract.getDataFeed(event.params._feedId)

  if (callResult){
    dataFeed._interval =  callResult.interval
    dataFeed._priceThreshold = callResult.priceThreshold
    dataFeed._reward = callResult.reward
    dataFeed._startTime = callResult.startTime
    dataFeed._window = callResult.window
    dataFeed._queryData = event.params._queryData
    dataFeed.txnHash = event.transaction.hash
  }

  dataFeed.save()
  entity.save()
}

export function handleOneTimeTipClaimed(event: OneTimeTipClaimed): void {
  let entity = new OneTimeTipClaimedEntity(event.block.timestamp.toHex())
  entity._queryId = event.params._queryId;
  entity._amount = event.params._amount;
  entity._reporter = event.params._reporter;
  entity.save()
}

export function handleTipAdded(event: TipAdded): void {
  let entity = new TipAddedEntity(event.block.timestamp.toHex())
  entity._queryId = event.params._queryId;
  entity._amount = event.params._amount;
  entity._queryData = event.params._queryData;
  entity._tipper = event.params._tipper;
  entity.txnHash = event.transaction.hash;
  entity._startTime = event.block.timestamp;
  entity.save()
}

export function handleTipClaimed(event: TipClaimed): void {
  let entity = new TipClaimedEntity(event.block.timestamp.toHex())
  entity._feedId = event.params._feedId;
  entity._queryId = event.params._queryId;
  entity._amount = event.params._amount;
  entity._reporter = event.params._reporter;
  entity.save()
}