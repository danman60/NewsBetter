import React from 'react'

interface ContentSection {
  id: string
  title: string
  content: string
  type: 'text' | 'list' | 'table'
  editable: boolean
}

interface NewsletterTemplateProps {
  customContent?: ContentSection[]
}

const NewsletterTemplate: React.FC<NewsletterTemplateProps> = ({ customContent = [] }) => {

  // Helper function to render custom content for specific sections
  const getCustomContentForSection = (sectionName: string): string => {
    const section = customContent.find(section =>
      section.title.toLowerCase().includes(sectionName.toLowerCase()) ||
      section.content.toLowerCase().includes(sectionName.toLowerCase())
    )
    return section ? section.content : ''
  }

  // Helper function to get content for a section, falling back to default if not found
  const getSectionContent = (sectionName: string, defaultContent: string): string => {
    const customContentText = getCustomContentForSection(sectionName)
    return customContentText || defaultContent
  }
  return (
    <div className="space-y-8">
      {/* COVER PAGE - Exact replica of SGC template */}
      <div className="page cover-page">
        <div className="text-right p-5 text-sm font-normal">
          THURSDAY SEPTEMBER 18, 2025 A few spots left<br/>
          SOUTH GATE CENTRE<br/>
          191 Old Wellington St. S., Woodstock, N4S 3J2<br/>
          519-539-9817 www.southgatectr.ca<br/>
          NUGGET<br/>
          SEPTEMBER 2025
        </div>

        <div className="font-impact text-newsletter-title font-black text-center mt-15 mb-5 tracking-wider"
             style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
          GOLDEN NUGGET
        </div>
        <div className="text-newsletter-subtitle font-bold text-center mb-10">
          SEPTEMBER 2025
        </div>

        <div className="bg-white bg-opacity-10 rounded-2xl p-8 mx-10 text-center backdrop-blur-sm border-2 border-white border-opacity-20">
          <h2 className="text-3xl mb-2.5" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
            SOUTH GATE ANNUAL
          </h2>
          <h3 className="text-2xl mb-4 text-sgc-gold">
            CHARITY GOLF<br/>TOURNAMENT
          </h3>
          <div className="text-xl my-4">THURSDAY SEPTEMBER 18, 2025</div>
          <div className="bg-sgc-gold text-sgc-green px-4 py-2 rounded-full font-bold inline-block mt-2.5">
            A few spots left
          </div>
        </div>

        <div className="bg-black bg-opacity-20 rounded-lg p-5 mx-10 mt-8 text-center">
          <div className="text-4xl italic mb-2.5 text-sgc-gold">Online</div>
          <div className="text-lg font-bold">FUNDRAISING<br/>AUCTION</div>
          <div className="text-sm mt-2.5">SEPT 8 AT NOON TO<br/>SEPT 18 AT MIDNIGHT</div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center bg-black bg-opacity-30 px-10 py-4 rounded-3xl backdrop-blur-xl">
          <div className="text-lg font-bold mb-2 text-sgc-gold">A PLACE TO LAUGH</div>
          <div>191 Old Wellington St. S., Woodstock, N4S 3J2<br/>519-539-9817 www.southgatectr.ca</div>
        </div>
      </div>

      {/* PAGE 2: WHO WE ARE - Exact match to original layout */}
      <div className="page">
        <div className="section-header">WHO WE ARE</div>

        <div className="flex">
          <div className="flex-1">
            <div className="float-right ml-8">
              <div className="w-25 h-25 bg-sgc-green rounded-full flex items-center justify-center text-white text-2xl font-bold">
                SGC
              </div>
            </div>

            <h3 className="text-lg text-sgc-green mt-5 mb-2 font-bold">Our Vision</h3>
            <div className="text-lg font-bold text-sgc-green">LIVE well PLAY well BE well</div>

            <h3 className="text-lg text-sgc-green mt-5 mb-2 font-bold">Our Mission</h3>
            <p className="mb-4">Engaging the 50+ Community in an open, active, social environment driven by volunteers. To promote wellness to fill one's mind, body and soul.</p>

            <h3 className="text-lg text-sgc-green mt-5 mb-2 font-bold">Our Values</h3>
            <ul className="ml-5 space-y-1">
              <li>Building an inclusive community.</li>
              <li>Fostering social engagement.</li>
              <li>Promoting wellness of mind, body and soul.</li>
            </ul>
          </div>
        </div>

        <div className="subsection-header">South Gate Centre Board of Directors</div>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <p><strong>Chair:</strong> Cristian Lagos</p>
            <p><strong>Past Chair:</strong> Kathy Deweerd</p>
            <p><strong>Treasurer:</strong> Patrice Hilderley</p>
            <p><strong>Secretary:</strong> Connie Lauder</p>
          </div>
          <div>
            <p>Jeff Gerber</p>
            <p>Mike Houle</p>
            <p>Audrey Price</p>
            <p>Jeff Workman</p>
          </div>
        </div>

        <div className="subsection-header">South Gate Centre Members Committee</div>
        <div className="grid grid-cols-3 gap-5">
          <div>
            <p><strong>Chair:</strong> Dave Clarke</p>
            <p><strong>Co-chair:</strong> Jodi Ziebarth</p>
            <p><strong>Board Liaison & Co-chair:</strong> Mike Houle</p>
            <p><strong>Secretary:</strong> Guy LaPlante</p>
          </div>
          <div>
            <p>Judy Tanguay</p>
            <p>Bev Rajani</p>
          </div>
          <div>
            <p>Linda Lee</p>
            <p>Kim Downs</p>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg my-5 text-center">
          <p className="text-gray-600 italic">They are always happy to answer questions and hear your suggestions and concerns, either in person or by dropping a note in the Suggestion Box located by the check-in desk.</p>
        </div>

        <div className="mt-8">
          <p><strong>Facebook:</strong> www.facebook.com/southgatectr<br/>
          <strong>Instagram:</strong> www.instagram.com/south_gate_centre</p>
        </div>

        <div className="text-xs mt-5 text-gray-600 border-t border-gray-300 pt-4">
          <p>South Gate Centre is a registered Canadian charity. Business Number 119145209RR0001<br/>
          Proudly funded partner of the City of Woodstock, and the province of Ontario. South Gate Centre acknowledges support we receive from all of our funders.</p>
        </div>
      </div>

      {/* PAGE 3: CALENDAR-AT-A-GLANCE - Exact layout match */}
      <div className="page">
        <div className="section-header">CALENDAR-AT-A-GLANCE</div>

        <div className="bg-gray-100 p-2 text-xs text-center mb-5 font-bold">
          Thursdays Lion's Club BINGO 7 pm
        </div>

        <div className="calendar-month">SEPTEMBER</div>

        <div className="event-item">
          <div className="event-date">Mon Sep 1</div>
          <div className="event-description">LABOUR DAY - CENTRE IS CLOSED - NO PROGRAMMING</div>
        </div>

        <div className="event-item">
          <div className="event-date">Tue Sep 9</div>
          <div className="event-description">VON Blood Pressure Clinic</div>
        </div>

        <div className="event-item">
          <div className="event-date">Wed Sep 10</div>
          <div className="event-description">BUS TRIP - A Day in Port Dover 9 am - 6 pm</div>
        </div>

        <div className="event-item">
          <div className="event-date">Tue Sep 16</div>
          <div className="event-description">Monthly Cruise-In at Movement Church 5 pm - 8 pm</div>
        </div>

        <div className="event-item">
          <div className="event-date">Thu Sep 18</div>
          <div className="event-description">South Gate Annual Charity Golf Tournament - Ingersoll Golf Club</div>
        </div>

        <div className="event-item">
          <div className="event-date">Fri Sep 19</div>
          <div className="event-description">BUS TRIP - Fallsview Casino 9 am - 6 pm</div>
        </div>

        <div className="event-item">
          <div className="event-date">Thu Sep 25</div>
          <div className="event-description">Golf League Banquet</div>
        </div>

        <div className="event-item">
          <div className="event-date">Sat Sep 27</div>
          <div className="event-description">BUS TRIP - Toronto Blue Jays 11:30 am - 8 pm</div>
        </div>

        <div className="calendar-month">OCTOBER</div>

        <div className="event-item">
          <div className="event-date">Thu Oct 2</div>
          <div className="event-description">BUS TRIP - St. Jacobs and Mennonite Country</div>
        </div>

        <div className="event-item">
          <div className="event-date">Thu Oct 9</div>
          <div className="event-description">Thanksgiving Luncheon by Local Roots 11:30 am - 1 pm Members $20</div>
        </div>

        <div className="event-item">
          <div className="event-date">Mon Oct 13</div>
          <div className="event-description">THANKSGIVING - CENTRE IS CLOSED - NO PROGRAMMING</div>
        </div>

        <div className="bg-yellow-100 border-2 border-yellow-400 p-4 rounded-lg mt-5 text-center">
          <p className="font-bold">Online Fundraising Auction Sep 8 - 18</p>
        </div>
      </div>

      {/* PAGE 4: MEMBERSHIP - Exact styling match */}
      <div className="page">
        <div className="section-header">MEMBERSHIP AT SOUTH GATE CENTRE</div>

        <div className="bg-blue-50 p-5 rounded-lg mb-5">
          <h3 className="text-lg font-bold text-sgc-green mb-4">MEMBERSHIP has ADVANTAGES</h3>
          <ul className="ml-5 space-y-1">
            <li>All drop in programs are FREE</li>
            <li>Save $ on Registered Programs, Cultural Dinners, Bus Trips and more…</li>
            <li>Save 10% on Room Rentals at SGC</li>
            <li>Discounts offered at select community partner businesses.</li>
          </ul>
          <p className="mt-4 font-bold">Not a member; what are you waiting for? Sign up today!</p>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div>
            <div className="subsection-header">2025 Membership Rates</div>
            <div className="bg-green-100 border-2 border-green-500 p-4 rounded-lg my-3">
              <div className="text-center font-bold text-green-800 text-base mb-2">ALL-INCLUSIVE MEMBERSHIP 2025</div>
              <hr className="my-2 border-green-500" />
              <div className="flex justify-between my-1">
                <span>Pre-authorized debit</span>
                <span className="font-bold">$25/Month</span>
              </div>
              <div className="flex justify-between my-1">
                <span>September 2025 - December 2025</span>
                <span className="font-bold">$100</span>
              </div>
            </div>
            <p className="text-xs mt-3">All-Inclusive membership includes all Drop-In programs/activities, and members pricing on Registered Programs.</p>
            <p className="text-xs mt-2">Credit/Debit/Cheque/Cash.</p>
            <p className="text-xs mt-2 font-bold">Member name tags must be worn at ALL times. Those without will be assumed to be a non-member.</p>
            <p className="text-xs mt-2 text-red-600 font-bold">MEMBERSHIPS ARE NON-REFUNDABLE.</p>
          </div>

          <div>
            <div className="subsection-header">WELCOME NEW MEMBERS</div>
            <div className="columns-2 text-sm leading-relaxed">
              <p>Lorraine Depaulo</p>
              <p>Catherine Downing-Reinhart</p>
              <p>Claude Gophier</p>
              <p>Teresa Knox</p>
              <p>Laurie Margerum</p>
              <p>Marjorie Robinson</p>
              <p>Karen Sample</p>
              <p>William Taylor</p>
              <p>Trevor Wilkinson</p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-100 border-2 border-yellow-400 p-4 rounded-lg mt-4">
          <div className="text-center font-bold mb-3">NON-MEMBERS ALWAYS WELCOME FEES</div>
          <p><strong>All Instructor-Lead Drop-In Programs*</strong> $10/Class (hourly)</p>
          <p className="text-xs">*Does NOT Include Registered Programs</p>
          <p><strong>All Other Drop-In Programs</strong> $5/Activity/Day</p>
        </div>
      </div>

      {/* PAGE 5: CONSTRUCTION & PROGRAMMING UPDATES - Exact match */}
      <div className="page">
        <div className="construction-header">CONSTRUCTION UPDATE</div>

        <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-5 my-5">
          <div className="flex gap-5 items-start">
            <div className="flex-1">
              <p className="mb-4">This week drywall, mudding and taping continue. Things are really starting to take shape.</p>
              <p className="mb-4">We made decisions on the "Feature Wall" at the new entrance and are making some decisions about furniture for the lounge and locations for the projectors and screens in the Great Hall. Heating lines are going in as are electrical rough-ins.</p>
              <p>A lot will be coming together over the next month. Painting will start, doors installed, flooring, countertops, custom millwork, plumbing fixtures... You're going to LOVE IT!</p>
            </div>
            <div className="w-1/3">
              <div className="w-full h-24 bg-gray-200 rounded-lg mb-3 flex items-center justify-center text-gray-500 text-sm">Construction Image 1</div>
              <div className="w-full h-24 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 text-sm">Construction Image 2</div>
            </div>
          </div>
        </div>

        <div className="subsection-header">PROGRAMMING UPDATE</div>

        <div className="my-5">
          <h4 className="text-sgc-green font-bold mt-4 mb-2">Program Changes:</h4>
          <ul className="ml-5">
            <li>Billiards Snooker and Beginner Billiards 8-ball on Tuesdays shifts to earlier timeslots. Beginner Billiards is every other week starting Sept. 2.</li>
            <li>Bid Euchre moves back to Tuesday Evenings in the café</li>
            <li>Stretch class moves outdoors on Wednesdays by the outdoor exercise equipment near South Gate Centre.</li>
          </ul>

          <h4 className="text-sgc-green font-bold mt-4 mb-2">Program Cancellations:</h4>
          <ul className="ml-5">
            <li>Tuesday, September 2 – Fitness, Bid Euchre, Cribbage, and Progressive Pepper</li>
            <li>Thursday, September 25 - Fitness, WOW and Euchre</li>
          </ul>

          <h4 className="text-sgc-green font-bold mt-4 mb-2">Returning Programs (see schedule for dates)</h4>
          <p>Darts, Carpet Bowling, Pickleball, Living History Education, Tech Literacy, Chair Yoga and VON Blood Pressure Clinic</p>
        </div>

        <div className="local-roots-header">LOCAL ROOTS UPDATE</div>

        <div className="bg-red-50 border border-red-300 rounded-lg p-5">
          <p>Starting in September, we'll have two soups available daily. Our Grab & Go fridge is always stocked with staple selections — sandwiches, salads, fruit cups, hard-boiled eggs, protein packs, and more. When Kristin prepares entrées for our Frozen Meal program, she'll also place some fresh portions in the fridge, ready to heat quickly in the microwave. You can also order from the full Frozen Meal menu (page 35) at the Front Desk. Please note that the lids on the Frozen Meals are not microwave safe, please remove and discard.</p>
        </div>
      </div>

      {/* PAGE 6: DONATIONS & NEWSLETTER RENAMING - Exact layout */}
      <div className="page">
        <div className="section-header">DONATIONS</div>

        <div className="grid grid-cols-3 gap-6 my-5">
          <div>
            <h4 className="text-sgc-green border-b border-sgc-green pb-1 mb-3 font-bold">ANNUAL GIVING</h4>
            <p className="text-sm leading-relaxed">Wellington Street Denture Clinic<br/>Cristian Lagos<br/>Margaret McCurdy</p>

            <h4 className="text-sgc-green border-b border-sgc-green pb-1 mt-5 mb-3 font-bold">CAPITAL CAMPAIGN</h4>
            <p className="text-sm leading-relaxed">Deanna Jasmins<br/>Dr. Leonard Reeves<br/>Pharmasave<br/>Rose Marie Nesbitt<br/>Rotary Club</p>
          </div>

          <div>
            <h4 className="text-sgc-green border-b border-sgc-green pb-1 mb-3 font-bold">FOOD ANGEL PROGRAM</h4>
            <p className="text-sm leading-relaxed">Linda Baker<br/>Ruth Hartley<br/>Suzanne Nagy<br/>Rotary Club</p>

            <h4 className="text-sgc-green border-b border-sgc-green pb-1 mt-5 mb-3 font-bold">GENERAL DONATIONS</h4>
            <p className="text-sm leading-relaxed">Dave Clarke<br/>Easy Way<br/>Lorna Materi<br/>Lorraine Petrie</p>
          </div>

          <div>
            <h4 className="text-sgc-green border-b border-sgc-green pb-1 mb-3 font-bold">IN KIND</h4>
            <p className="text-sm leading-relaxed">Giant Tiger<br/>Lorna Materi</p>

            <h4 className="text-sgc-green border-b border-sgc-green pb-1 mt-5 mb-3 font-bold">IN MEMORY</h4>
            <p className="text-sm leading-relaxed">In Memory of Sue Ann Martens<br/>Marilyn & John Martin<br/><br/>In Memory of Gwen Lake<br/>Marilyn & John Martin</p>

            <h4 className="text-sgc-green border-b border-sgc-green pb-1 mt-5 mb-3 font-bold">PROGRAM DONATIONS</h4>
            <p className="text-sm leading-relaxed">Judy Klages<br/>Jeff Workman</p>
          </div>
        </div>

        <div className="bg-blue-50 border-2 border-sgc-blue rounded-lg p-5 my-8 text-center">
          <p className="italic mb-4">Every gift, large or small, helps South Gate Centre thrive. Thank you for making a difference in the lives of our members and our community.</p>
        </div>

        <div className="subsection-header">RENAMING THE GOLDEN NUGGET</div>

        <div className="bg-yellow-50 border-2 border-yellow-600 rounded-lg p-5">
          <p className="mb-4">Acting on a proposal by the Members Committee to consider renaming the Golden Nugget newsletter to better reflect the vitality and diverse interests of our members, we have voted on a list of several suggested names and have narrowed them down to three.</p>

          <p className="mb-4">We would now like to provide the opportunity for all South Gate members to vote on your new favourite name among these three (in alphabetical order).</p>

          <div className="bg-white p-4 rounded-lg my-4 text-center">
            <p className="font-bold mb-3">• ON THE MOVE<br/>• PRIME TIME<br/>• WHAT'S THE BUZZ</p>
          </div>

          <p className="text-sm">Paper ballots and a drop box will be made available at the sign in desk for you to vote. Alternatively, you may vote online at www.southgatectr.com/newslettername. Voting closes September 12. We look forward to the choice you make for the new SGC newsletter.</p>

          <p className="text-right mt-4 italic">With anticipation for your voice to be heard,<br/><strong>The Members Committee</strong></p>
        </div>
      </div>

      {/* PAGE 7: STRAIGHT FROM THE GATE - Exact styling match */}
      <div className="page">
        <div className="section-header">STRAIGHT FROM THE GATE</div>

        <div className="flex gap-8 my-5">
          <div className="flex-1">
            <p className="mb-4">Welcome Fall—and a new season of fresh beginnings. After a hot and eventful summer, we're ready for cooler days and to welcome you back from your travels and adventures.</p>

            <p className="mb-4">Our expansion is in the home stretch—less than three months until the ribbon cutting, open house, "members only" event, and Big Band night! The new spaces are more beautiful than I ever imagined, and I can't wait to share them with you. Thank you for your patience and perseverance—your resilience has been remarkable.</p>

            <p className="mb-4">A heartfelt thank-you to our remarkable volunteers for a truly incredible summer, and to our staff whose passion and dedication make South Gate such a vibrant place. Together, you keep our mission alive.</p>

            <p className="mb-4">Whether you're a long-time member, a volunteer, or just joining us, know that you are a vital part of our story. Staying active and thriving after 50 has never looked so good. You are enough. You are amazing. And the best is yet to come.</p>

            <div className="mt-6">
              <p className="italic">With gratitude and a smile</p>
              <div className="font-bold text-base text-sgc-green">Chris Cunningham</div>
              <div className="italic text-gray-600">Executive Director</div>
            </div>
          </div>
          <div className="w-1/3 text-center">
            <div className="w-36 h-36 bg-gray-200 rounded-lg mx-auto flex items-center justify-center text-gray-500 text-sm">Director Photo</div>
          </div>
        </div>

        <div className="subsection-header">WELCOME TO THE TEAM</div>

        <div className="flex gap-8 my-5">
          <div className="flex-1">
            <p className="mb-4">Trish hails from Nova Scotia, having moved to Woodstock in 1997 with her husband and 3 sons.</p>

            <p className="mb-4">A varied career in the field of senior care followed, mostly putting her recreation background to work in the Long-Term Care sector.</p>

            <p className="mb-4">While volunteering on the SGC Steering Committee for the grand re-opening of our new edition, Trish knew that the SGC team was where she truly felt the most at home and jumped at the chance to get back in the recreation "saddle" again when this position became available!</p>

            <p className="mb-4">Trish enjoys spending her down-time with her three, beautiful grandchildren, living an active life with her husband and laughing as much as possible!</p>

            <p className="mb-4">In her role, Trish will focus on office administration, internal systems, and membership support. She'll also co-lead volunteer coordination and contribute to special events and program planning in close collaboration with Angela, our Program & Volunteer Coordinator. Together, they'll form a dynamic, balanced partnership that supports our members and strengthens our community.</p>

            <p className="font-bold">We're so excited for all that's ahead — please join us in giving Trish a warm South Gate welcome!</p>
          </div>
          <div className="w-1/3 text-center">
            <div className="w-36 h-36 bg-gray-200 rounded-lg mx-auto flex items-center justify-center text-gray-500 text-sm">New Staff Photo</div>
          </div>
        </div>

        <div className="text-center mt-10">
          <div className="inline-block mx-5 bg-green-100 text-green-800 px-5 py-2 rounded-full font-bold">WELCOME BACK!</div>
          <div className="inline-block mx-5 italic text-2xl text-sgc-green">thank you</div>
          <div className="inline-block mx-5 bg-blue-100 text-blue-800 px-5 py-2 rounded-full font-bold">You're THE BEST</div>
        </div>
      </div>

      {/* PAGE 8: MEMBERS' COMMITTEE & THANK YOU - Exact layout */}
      <div className="page">
        <div className="section-header">MEMBERS' COMMITTEE MESSAGE</div>

        <div className="my-5">
          <p className="mb-4">After a great summer, we're back and looking forward to the exciting months ahead as we get closer to the opening of our new facility.</p>

          <p className="mb-4">September 30th marks the end of my six years on the Members Committee, and it's been a privilege to work alongside such dedicated, enthusiastic members, each bringing unique skills in representing the diverse interests of all South Gate members.</p>

          <p className="mb-4">The Committee continues to share your concerns and ideas with staff and the board, and follows up to ensure progress. Now, you have the opportunity to be a part of it as we currently have two vacancies—if you'd like to help shape South Gate's future, we'd love to hear from you.</p>

          <div className="flex gap-5 my-5">
            <div className="flex-1">
              <p className="mb-4">Though my term is ending, I leave knowing the Committee is in capable hands and that new members will bring fresh energy. I look forward to continue enjoying South Gate's many programs and events alongside you.</p>

              <div className="mt-5">
                <p className="italic">Warm regards,</p>
                <p><strong>Dave Clarke</strong><br/><em>Chair – Members Committee</em></p>
              </div>
            </div>
            <div className="w-1/3">
              <div className="grid grid-cols-2 gap-2">
                {['Dave', 'Jodi', 'Mike', 'Guy', 'Bev', 'Linda', 'Judy', 'Kim'].map((name, index) => (
                  <div key={index} className="text-center">
                    <div className="w-15 h-15 rounded-full bg-gray-300 mx-auto mb-1"></div>
                    <p className="text-xs font-bold">{name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="subsection-header">THANK YOU & FAREWELL</div>

        <div className="flex gap-8 my-5 text-center">
          <div className="flex-1">
            <div className="w-24 h-24 rounded-lg bg-gray-300 mx-auto mb-3"></div>
            <h4 className="font-bold">Ryan McNamara</h4>
            <p className="text-sm text-gray-600">Marketing Assistant</p>
          </div>
          <div className="flex-1">
            <div className="w-24 h-24 rounded-lg bg-gray-300 mx-auto mb-3"></div>
            <h4 className="font-bold">Hannah Crosdale</h4>
            <p className="text-sm text-gray-600">Program & Volunteer Assistant</p>
          </div>
          <div className="flex-1">
            <div className="w-24 h-24 rounded-lg bg-gray-300 mx-auto mb-3"></div>
            <h4 className="font-bold">Jordan Gallagher</h4>
            <p className="text-sm text-gray-600">Office Assistant</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-5 my-5">
          <p>This summer, we had the pleasure of working with three incredible students who brought energy, positivity, and dedication to South Gate Centre. No matter the task, they approached it with enthusiasm and a willingness to help wherever needed—providing vital support to staff during a busy season. We are truly grateful for their hard work and the spirit they brought to our team. As they move forward, we wish them every success in their future endeavors. Please don't be strangers—we look forward to seeing you continue to grow and thrive!</p>
        </div>
      </div>

      {/* Navigation for development */}
      <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-sgc-green">
        <h3 className="text-xl font-bold text-sgc-green mb-4">🎯 Complete SGC Template</h3>
        <p className="text-gray-700 mb-4">This demonstrates the complete 8-page SGC Newsletter template with exact styling matches from the original HTML template.</p>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-sgc-green text-white p-4 rounded-lg">
            <h4 className="font-bold mb-2">✅ Complete Template Pages:</h4>
            <ul className="text-sm space-y-1">
              <li>• Cover Page with event highlights</li>
              <li>• WHO WE ARE organizational info</li>
              <li>• CALENDAR-AT-A-GLANCE events</li>
              <li>• MEMBERSHIP rates & benefits</li>
              <li>• CONSTRUCTION & PROGRAMMING updates</li>
              <li>• DONATIONS & newsletter renaming</li>
              <li>• STRAIGHT FROM THE GATE message</li>
              <li>• MEMBERS' COMMITTEE & thank you</li>
            </ul>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg">
            <h4 className="font-bold mb-2 text-sgc-green">🔄 Next Implementation:</h4>
            <ul className="text-sm space-y-1 text-gray-700">
              <li>• Add content upload/editing interface</li>
              <li>• Implement PDF export functionality</li>
              <li>• Create drag-drop editor interface</li>
              <li>• Add photo placement controls</li>
              <li>• Build newsletter generation workflow</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewsletterTemplate