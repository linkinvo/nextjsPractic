import * as React from 'react';

export interface ILayoutProps {
    children: React.ReactNode;
}
export interface ILayouTState {
}


export default class AuthLayout extends React.Component<ILayoutProps> {
    constructor(props: ILayoutProps) {
        super(props);
    }

    public render() {
        const { children } = this.props;
        return (
            <>
                {children}
            </>
        )
    }
}