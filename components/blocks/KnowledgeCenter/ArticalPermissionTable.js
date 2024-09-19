import ImageBlock from '@/components/global/ImageBlock'
import React from 'react'

export default function ArticalPermissionTable() {
    const permissionTable = [
        {
            id: 1, title: 'Bank accounts',
            permissiontitlevalue: [
                { id: 1, title: 'View Balance/ transaction', admin: true, bookkeeper: true, card: false, customUser: true },
                { id: 2, title: 'Send and receive money', admin: true, bookkeeper: false, card: false, customUser: true },
                { id: 3, title: 'Create checking account', admin: true, bookkeeper: false, card: false, customUser: false },
                { id: 4, title: 'Link external accounts', admin: true, bookkeeper: false, card: false, customUser: false },
                { id: 5, title: 'Approve payment', admin: true, bookkeeper: false, card: false, customUser: false },
                { id: 6, title: 'Add nots and attachment', admin: true, bookkeeper: true, card: true, customUser: true },
                { id: 7, title: 'Download statements', admin: true, bookkeeper: true, card: false, customUser: true },
            ]
        },
        {
            id: 2, title: 'Team',
            permissiontitlevalue: [
                { id: 1, title: 'Invite or remove', admin: true, bookkeeper: false, card: false, customUser: false },
                { id: 2, title: 'Edit role', admin: true, bookkeeper: false, card: false, customUser: false },
            ]
        },
        {
            id: 3, title: 'Security',
            permissiontitlevalue: [
                { id: 1, title: 'Update account settings', admin: true, bookkeeper: false, card: false, customUser: false },
                { id: 2, title: 'Receive security alerts', admin: true, bookkeeper: false, card: false, customUser: false },
                { id: 3, title: 'Create API tokens', admin: true, bookkeeper: true, card: false, customUser: true },
                { id: 4, title: 'Approve 2FA resets', admin: true, bookkeeper: false, card: false, customUser: false },
                { id: 5, title: 'Set payment limits', admin: true, bookkeeper: false, card: false, customUser: false },
            ]
        },
        {
            id: 4, title: 'Cards',
            permissiontitlevalue: [
                { id: 1, title: 'Get a card', admin: true, bookkeeper: false, card: false, customUser: true },
                { id: 2, title: 'Change card limits', admin: true, bookkeeper: false, card: false, customUser: false },
            ]
        }

    ]
    return (
        <>
            <div className="permission_table">
                <table className='outer_table'>
                    <thead className='outer_thead'>
                        <tr>
                            <th>Permission</th>
                            <th>Admin</th>
                            <th>BookKeeper</th>
                            <th>Card Only</th>
                            <th>Customer User</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={5}>
                                {
                                    permissionTable.map((tableLabels) =>
                                        <table key={tableLabels.id} className='inner_table'>
                                            <thead className='inner_thead'>
                                                <tr>
                                                    <th colSpan={5}>{tableLabels.title}</th>
                                                </tr>
                                            </thead>
                                            <tbody className='inner_tbody'>
                                                {
                                                    tableLabels.permissiontitlevalue.map((row) =>
                                                        <tr key={row.id}>
                                                            <td colSpan={1}>{row.title}</td>
                                                            <td colSpan={1}>{row.admin === true ? <ImageBlock image='images/table_tick.png' /> : <ImageBlock image='images/table_empty.png' />}</td>
                                                            <td colSpan={1}>{row.bookkeeper === true ? <ImageBlock image='images/table_tick.png' /> : <ImageBlock image='images/table_empty.png' />}</td>
                                                            <td colSpan={1}>{row.card === true ? <ImageBlock image='images/table_tick.png' /> : <ImageBlock image='images/table_empty.png' />}</td>
                                                            <td colSpan={1}>{row.customUser === true ? <ImageBlock image='images/table_tick.png' /> : <ImageBlock image='images/table_empty.png' />}</td>
                                                        </tr>
                                                    )
                                                }
                                            </tbody>
                                        </table>
                                    )

                                }
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}
