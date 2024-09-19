import dlv from "dlv";
import TeamImages from "./TeamImages";
import SectionHead from "@/components/global/SectionHead";
export default function MeetTeam({ teamimg, itemimage, sarabun }) {
  // Split the homeCustomer array in three columns
  const teamIndex = Math.ceil(itemimage.length / 3);
  const teamFirstHalf = itemimage.slice(0, teamIndex);
  const teamSecondHalf = itemimage.slice(
    teamIndex,
    teamIndex * 2
  );
  const teamThirdHalf = itemimage.slice(teamIndex * 2);

  return (
    <div className="section_padding section_bg ">
      <div className="main_container ">
        <div className=" about_us_Team">
          <SectionHead title={`${dlv(teamimg, 'heading')}`} desc={`${dlv(teamimg, 'description')}`} cta={dlv(teamimg, 'button.0')} sarabun={sarabun} />
          <div className="team_images grid_custom">
            <div className="team_col ">
              <TeamImages items={teamFirstHalf} />
            </div>
            <div className="team_col">
              <TeamImages items={teamSecondHalf} />
            </div>
            <div className="team_col">
              <TeamImages items={teamThirdHalf} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


