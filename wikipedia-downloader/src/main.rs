use std::error::Error;
use std::path::PathBuf;

use clap::Parser;
use quick_xml::de::from_reader;
use serde::Deserialize;

#[derive(Debug, clap::Parser)]
struct Args {
    file: PathBuf,
}

#[derive(Debug, Deserialize)]
struct MediaWiki {
    #[serde(rename = "page")]
    pages: Vec<Page>,
}

#[derive(Debug, Deserialize)]
struct Page {
    title: String,
    ns: u32,
    revision: Revision,
}

#[derive(Debug, Deserialize)]
struct Revision {
    model: String,
    format: String,
    text: String,
}

fn main() -> Result<(), Box<dyn Error>> {
    let args = Args::parse();
    let file = std::fs::File::open(args.file)?;
    let reader = std::io::BufReader::new(file);

    let mediawiki: MediaWiki = from_reader(reader)?;

    println!("Number of pages: {}", mediawiki.pages.len());

    for page in mediawiki.pages.iter().take(5) {
        println!("Page Title ({}): {}", page.ns, page.title);
        println!(
            "Text {}, {}: {}",
            page.revision.model, page.revision.format, page.revision.text
        );
        println!("");
    }

    Ok(())
}
