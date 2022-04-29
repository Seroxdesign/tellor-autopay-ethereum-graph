import {
  Contract,
  DataFeedFunded,
  NewDataFeed,
  OneTimeTipClaimed,
  TipAdded,
  TipClaimed
} from "../generated/Contract/Contract"
import { DataFeedFundedEntity, NewDataFeedEntity, OneTimeTipClaimedEntity, TipAddedEntity, TipClaimedEntity } from "../generated/schema"

export function handleDataFeedFunded(event: DataFeedFunded): void {
  let entity = new DataFeedFundedEntity(event.block.timestamp.toHex())
  entity._queryId = event.params._queryId;
  entity._feedId = event.params._feedId;
  entity._amount = event.params._amount;
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
  let entity = new NewDataFeedEntity(event.block.timestamp.toHex())
  entity._token = event.params._token;
  entity._queryId = event.params._queryId;
  entity._feedId = event.params._feedId;
  entity._queryData = event.params._queryData;
  entity.save()
}

export function handleOneTimeTipClaimed(event: OneTimeTipClaimed): void {
  let entity = new OneTimeTipClaimedEntity(event.block.timestamp.toHex())
  entity._queryId = event.params._queryId;
  entity._token = event.params._token;
  entity._amount = event.params._amount;
  entity.save()
}

export function handleTipAdded(event: TipAdded): void {
  let entity = new TipAddedEntity(event.block.timestamp.toHex())
  entity._token = event.params._token;
  entity._queryId = event.params._queryId;
  entity._amount = event.params._amount;
  entity._queryData = event.params._queryData;
  entity.save()
}

export function handleTipClaimed(event: TipClaimed): void {
  let entity = new TipClaimedEntity(event.block.timestamp.toHex())
  entity._feedId = event.params._feedId;
  entity._queryId = event.params._queryId;
  entity._token = event.params._token;
  entity._amount = event.params._amount;
  entity.save()
}
