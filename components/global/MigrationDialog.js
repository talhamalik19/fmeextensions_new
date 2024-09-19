import { getStrapiURL } from '@/utils';
import dlv from 'dlv';
import Link from 'next/link';
import LoadingAnimation from '../shared/LoadingAnimation';
import { useState } from 'react';

export default function MigrationDialog({ state, setState, migrationDialogData }) {
    const [isLoading, setIsLoading] = useState(false)
    const overlayBg = {
        backgroundColor: 'rgba(228, 113, 67, 0.40)',
    };
    const backGroundGlass = {
        backgroundImage: 'linear-gradient(139deg, rgba(241, 216, 246, 0.28) 1.26%, rgba(251, 232, 228, 0.98) 39.08%, rgba(254, 238, 245, 0.45) 76.82%)',
        border: '1px solid #fff',
    };

    const closeModal = () => {
        setState(false);
        // Re-enable scrolling when the popup is closed
        document.body.style.overflow = 'auto';
    };

    const handleDownload = async (id, title, sample_url) => {
        const linkTitle = title.split('||');

        setIsLoading(true);

        try {
            const response = await fetch(getStrapiURL('/graphql'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: `
                    {
                        getSampleFile(linkId: "${id}") {
                          fileContent,
                          fileExtension
                        }
                      }     
                    `,
                    variables: {},
                }),
            });

            const data = await response.json();
            const file = data.data.getSampleFile[0].fileContent;
            const ext = data.data.getSampleFile[0].fileExtension;
            if (!ext) {
                // window.location.href=linkTitle[1];
                setIsLoading(false);
                window.open(linkTitle[1], '_blank');
                return false;
            }

            // Decode the Base64 string directly to Uint8Array
            const uint8Array = Uint8Array.from(atob(file), c => c.charCodeAt(0));

            // Asynchronously create Blob
            const blob = await new Promise((resolve) => {
                resolve(new Blob([uint8Array], { type: 'application/octet-stream' }));
            });

            // Create a download link and trigger a download
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `${title}.${ext.split('?')[0]}`; // Set the desired file name
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            window.location.href = sample_url;
            // Handle error if needed
        } finally {
            setIsLoading(false);
        }
    };

    return (

        state && (
            // If state is true show below block
            <div className="dialog_main overlay fixed inset-0 z-20">
                <div style={overlayBg} className='dialog_size fixed inset-0 w-full h-full' onClick={closeModal}></div>
                <div className='dialog_position flex items-center justify-center min-h-screen px-5'>
                    <div style={backGroundGlass} className='dialog_block max-w-3xl w-full p-3 rounded-lg relative'>
                        <div className='bg-secondaryColor py-8 px-8 md:py-10 md:px-10 xl:py-12 xl:px-12 rounded-lg'>
                            {/* <h3 className='text-2xl md:text-3xl xl:text-4xl font-semibold text-center text-titleColor'>Heading</h3>
                            <p className='text-base md:text-lg xl:text-lg py-6 xl:py-8 text-center text-textColor md:w-9/12 m-auto'>Text</p> */}
                            {dlv(migrationDialogData, 'button') ? <div className="dialog_cta flex flex-wrap items-center justify-center gap-5">
                                <>
                                    {dlv(migrationDialogData, 'button.0.field_text') && dlv(migrationDialogData, 'button.0.field_redirect') && <Link onClick={closeModal} href={`${dlv(migrationDialogData, 'button.0.field_redirect')}`} target={`${dlv(migrationDialogData, 'button.0.field_target')}`} className='text-base md:text-lg xl:text-xl min-w-[10em] bg-primaryColor text-secondaryColor border-solid border-[1px] border-primaryColor rounded-full text-center py-2 px-4 hover:bg-transparent hover:text-primaryColor transition-all'>{dlv(migrationDialogData, 'button.0.field_text')}</Link>}
                                    {dlv(migrationDialogData, 'button.1.field_text') && dlv(migrationDialogData, 'button.1.field_redirect') && <Link onClick={closeModal} href={`${dlv(migrationDialogData, 'button.1.field_redirect')}`} target={`${dlv(migrationDialogData, 'button.1.field_target')}`} className='text-base md:text-lg xl:text-xl min-w-[10em] bg-primaryColor text-secondaryColor border-solid border-[1px] border-primaryColor rounded-full text-center py-2 px-4 hover:bg-transparent hover:text-primaryColor transition-all'>{dlv(migrationDialogData, 'button.1.field_text')}</Link>}
                                    {dlv(migrationDialogData, 'button.2.field_text') && dlv(migrationDialogData, 'button.2.field_redirect') && <Link onClick={closeModal} href={`${dlv(migrationDialogData, 'button.2.field_redirect')}`} target={`${dlv(migrationDialogData, 'button.2.field_target')}`} className='text-base md:text-lg xl:text-xl min-w-[10em] bg-primaryColor text-secondaryColor border-solid border-[1px] border-primaryColor rounded-full text-center py-2 px-4 hover:bg-transparent hover:text-primaryColor transition-all'>{dlv(migrationDialogData, 'button.2.field_text')}</Link>}
                                    {dlv(migrationDialogData, 'button.3.field_text') && dlv(migrationDialogData, 'button.3.field_redirect') && <Link onClick={closeModal} href={`${dlv(migrationDialogData, 'button.3.field_redirect')}`} target={`${dlv(migrationDialogData, 'button.3.field_target')}`} className='text-base md:text-lg xl:text-xl min-w-[10em] bg-primaryColor text-secondaryColor border-solid border-[1px] border-primaryColor rounded-full text-center py-2 px-4 hover:bg-transparent hover:text-primaryColor transition-all'>{dlv(migrationDialogData, 'button.3.field_text')}</Link>}
                                    {dlv(migrationDialogData, 'button.4.field_text') && dlv(migrationDialogData, 'button.4.field_redirect') && <Link onClick={closeModal} href={`${dlv(migrationDialogData, 'button.4.field_redirect')}`} target={`${dlv(migrationDialogData, 'button.4.field_target')}`} className='text-base md:text-lg xl:text-xl min-w-[10em] bg-primaryColor text-secondaryColor border-solid border-[1px] border-primaryColor rounded-full text-center py-2 px-4 hover:bg-transparent hover:text-primaryColor transition-all'>{dlv(migrationDialogData, 'button.4.field_text')}</Link>}
                                    {dlv(migrationDialogData, 'button.5.field_text') && dlv(migrationDialogData, 'button.5.field_redirect') && <Link onClick={closeModal} href={`${dlv(migrationDialogData, 'button.5.field_redirect')}`} target={`${dlv(migrationDialogData, 'button.5.field_target')}`} className='text-base md:text-lg xl:text-xl min-w-[10em] bg-transparent text-textColor border-solid border-[1px] border-textColor rounded-full text-center py-2 px-4 hover:bg-textColor hover:text-secondaryColor transition-all cursor-pointer'>{dlv(migrationDialogData, 'button.5.field_text')}</Link>}
                                </>
                            </div>
                                :
                                <ul className='list_block'>
                                    {
                                        migrationDialogData.map((samples, index) => (
                                            <li key={`user-guide-${index}`} className='list_item'><button className='primary_cta cta_link' target='_blank' onClick={() => handleDownload(dlv(samples, 'id'), dlv(samples, 'title'), dlv(samples, 'sample_url'))}>{dlv(samples, 'title')}</button></li>
                                        )
                                        )
                                    }
                                </ul>
                            }
                        </div>
                        <LoadingAnimation isLoading={isLoading}/>
                    </div>
                </div>
            </div>
        )

    )
}
