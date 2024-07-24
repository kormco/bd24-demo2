import { Footer } from 'flowbite-react';
import Image from 'next/image';
import React from 'react';

const FooterSection = () => {
    const getCurrentYear = () => {
        return new Date().getFullYear();
    };

    return (
        <div className="fixed bottom-0 w-full z-20">
            <Footer container={true}>
                <div className="container flex flex-wrap justify-between items-center mx-auto">
                    <Footer.Copyright
                        href="https://linkedin.com/in/evankormos"
                        by="Evan Kormos"
                        year={getCurrentYear()}
                    />
                    <Footer.LinkGroup>
                        <Footer.Link href="https://www.buckeyedreamin.com/">
                            <div className="flex items-center gap-2">
                                <Image
                                    src="/icons/salesforce-svgrepo-com.svg"
                                    alt="Salesforce"
                                    width={20}
                                    height={20}
                                />
                                <p>Buckeye Dreamin' 24</p>
                            </div>
                        </Footer.Link>
                        <Footer.Link href="https://github.com/kormco/bd24-demo2">
                            <div className="flex items-center gap-2">
                                <Image
                                    src="/icons/github-svgrepo-com.svg"
                                    alt="Github Repo"
                                    width={25}
                                    height={25}
                                />
                                <p>Github</p>
                            </div>
                        </Footer.Link>
                    </Footer.LinkGroup>
                </div>
            </Footer>
        </div>
    );
};

export default FooterSection;
