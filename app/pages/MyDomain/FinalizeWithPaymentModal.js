import { Amount } from 'hsd/lib/ui';
import {consensus} from 'hsd/lib/protocol';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MiniModal } from '../../components/Modal/MiniModal';
import { clientStub as nClientStub } from '../../background/node/client';
import { clientStub as wClientStub } from '../../background/wallet/client';
import { waitForPassphrase } from '../../ducks/walletActions';

const node = nClientStub(() => require('electron').ipcRenderer);
const wallet = wClientStub(() => require('electron').ipcRenderer);

class FinalizeWithPaymentModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
      price: '',
      hex: '',
    };
  }

  onClickFinalize = async () => {
    try {
      const fundingAddr = (await wallet.generateReceivingAddress()).address;
      await this.props.waitForPassphrase();
      const hex = await node.finalizeWithPayment(
        this.props.name,
        fundingAddr,
        this.props.transferTo,
        Amount.fromCoins(this.state.price).toValue(),
      );
      this.setState({
        hex,
      });
    } catch (e) {
      this.setState({
        error: e.message || e,
      });
    }
  };

  render() {
    const { hex } = this.state;

    return (
      <MiniModal title="Finalize With Payment" onClose={this.props.onClose}>
        {hex && this.renderInstructions()}
        {!hex && this.renderForm()}
      </MiniModal>
    );
  }

  renderInstructions() {
    return (
      <>
        <p>Send the hex string below to your counterparty.</p>

        <div className="import-enter__textarea-container">
            <textarea
              className="import_enter_textarea"
              value={this.state.hex}
              disabled={true}
              rows={12}
            />
        </div>

        <div className="send__actions">
          <button
            className="send__cta-btn"
            onClick={this.props.onClose}
          >
            Done
          </button>
        </div>
      </>
    );
  }

  processValue = (val) => {
    const value = val.match(/[0-9]*\.?[0-9]{0,6}/g)[0];
    if (Number.isNaN(parseFloat(value)))
      return;
    if (value * consensus.COIN > consensus.MAX_MONEY)
      return;
    this.setState({price: value});
  }

  renderForm() {
    const isValid = !!this.state.price && (
      !!this.state.price && Number(this.state.price) <= 2000
    );

    return (
      <>
        <p>
          To require payment to finalize this transfer,
          verify the recipient's name transfer address and
          enter the agreed price in HNS below.
        </p>

        <p>
          <strong>
            As a precaution, transfers are limited to 2000 HNS
            until this feature has been sufficiently tested.
          </strong>
        </p>

        <div className="send__to">
          <div className="send__input">
            <input
              type="number"
              min={0}
              placeholder="0.000000"
              onChange={(e) => this.processValue(e.target.value)}
              value={this.state.price}
            />
          </div>
        </div>
        <div className="send__to">      
          Name recipient address:
        </div>
        <div className="send__to">
          {this.props.transferTo}
        </div>
        <div className="send__actions">
          <button
            className="send__cta-btn"
            onClick={this.onClickFinalize}
            disabled={!isValid}
          >
            Finalize
          </button>
        </div>
      </>
    );
  }
}


export default connect(
  () => ({}),
  dispatch => ({
    waitForPassphrase: () => dispatch(waitForPassphrase()),
  })
)(FinalizeWithPaymentModal);
