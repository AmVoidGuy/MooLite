import {ChatMessage} from "src/MooLite/core/chat/ChatMessage";
import {SimpleEventDispatcher} from "strongly-typed-events";
import {ChatChannelTypeHrid} from "src/MooLite/core/chat/ChatChannelTypeHrid";

export class Chat {
    private _messages: ChatMessage[] = [];

    private _onMessage = new SimpleEventDispatcher<ChatMessage>();

    private _onGeneralMessage = new SimpleEventDispatcher<ChatMessage>();
    private _onTradeMessage = new SimpleEventDispatcher<ChatMessage>();
    private _onHelpMessage = new SimpleEventDispatcher<ChatMessage>();
    private _onWhisperMessage = new SimpleEventDispatcher<ChatMessage>();

    public get onMessage() {
        return this._onMessage.asEvent();
    }

    public get onGeneralMessage() {
        return this._onGeneralMessage.asEvent();
    }

    public get onTradeMessage() {
        return this._onTradeMessage.asEvent();
    }


    public get onHelpMessage() {
        return this._onHelpMessage.asEvent();
    }

    public get onWhisperMessage() {
        return this._onWhisperMessage.asEvent();
    }


    addMessage(chatMessage: ChatMessage): void {
        this._messages.push(chatMessage);

        this._onMessage.dispatch(chatMessage);

        switch (chatMessage.channel) {
            case ChatChannelTypeHrid.General:
                this._onGeneralMessage.dispatch(chatMessage);
                break;
            case ChatChannelTypeHrid.Trade:
                this._onTradeMessage.dispatch(chatMessage)
                break;
            case ChatChannelTypeHrid.Help:
                this._onHelpMessage.dispatch(chatMessage)
                break;
            case ChatChannelTypeHrid.Whisper:
                this._onWhisperMessage.dispatch(chatMessage);
                break;

        }
    }
}